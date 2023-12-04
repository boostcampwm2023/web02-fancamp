import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { CampService } from 'src/camp/camp.service';
import { UserService } from 'src/user/user.service';
import { LikeRepository } from './like.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repository';
import { ERR_MESSAGE } from 'src/utils/constants';
import { Certificate } from 'crypto';
import { Post } from './entities/post.entity';
import { UpdateCommenttDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ImageService } from 'src/image/image.service';
import { getSentiment, getSentimentColor } from 'src/utils/sentiment';
import { NoticeGateway } from 'src/notice/notice.gateway';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository,
    private readonly campService: CampService,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly noticeGateway: NoticeGateway,
  ) {}

  async findAllCampsPosts(cursor: string) {
    const cursorDate = new Date(cursor);
    const posts = await this.postRepository.findAll(cursorDate);
    if (!posts.length) {
      return {
        cursor: cursor,
        nextCursor: null,
        result: [],
      };
    }

    const results = posts.map((post) => {
      return post.postId;
    });

    return {
      cursor: cursor,
      nextCursor: posts.slice(-1)[0].createdAt,
      result: results,
    };
  }

  /* Post */
  async createPost(
    files: Array<Express.Multer.File>,
    createPostDto: CreatePostDto,
    publicId: string,
  ) {
    const user = await this.userService.findUserByPublicId(publicId);
    if (!user.isMaster) {
      throw new HttpException(
        ERR_MESSAGE.POST_WRITER_IS_NOT_MASTER,
        HttpStatus.BAD_REQUEST,
      );
    }
    const camp = await this.campService.findOne(createPostDto.campName);
    const pictureCount = files ? files.length : 0;
    const post = await this.postRepository.create(
      createPostDto,
      user.id,
      camp.campId,
      user.isMaster,
      pictureCount,
    );
    await this.imageService.uploadPostFiles(files, post.postId, post.campId);
    this.noticeGateway.noticePost(camp.campId, camp.campName);
    return { ...post, publicId: publicId };
  }

  async findPostWithUrls(postId: number, publicId: string) {
    const post = await this.postRepository.findOne(postId);
    const { publicId: writerPublicId } =
      await this.userService.findUserByUserId(post.userId);
    const likeCount = await this.countLikes(postId);
    const commentCount = await this.countComments(postId);
    const url = await this.imageService.findImagesByPostId(postId);
    const isLike = await this.isLikePost(postId, publicId);
    return {
      ...post,
      publicId: writerPublicId,
      isLike: isLike,
      likeCount: likeCount,
      commentCount: commentCount,
      url: url,
    };
  }

  async isLikePost(postId: number, publicId: string) {
    if (publicId) {
      const user = await this.userService.findUserByPublicId(publicId);
      if (user) return await this.findLikeByPostId(postId, user.id);
    }
    return false;
  }

  async findAllPostsByCampName(campName: string) {
    //TODO: 쿠키 분석해서 구독중인지 확인
    const camp = await this.campService.findOne(campName);
    const posts = await this.postRepository.findAllByMasterId(camp.masterId);
    return await Promise.all(
      posts.map(async (post) => {
        const { publicId: writerPublicId } =
          await this.userService.findUserByUserId(post.userId);
        const urls = await this.imageService.findImagesByPostId(post.postId); //TODO: 이미지 없으면

        if (urls[0] && !urls[0].mimetype.startsWith('image')) {
          //TODO: 나중에 썸네일 추출 기능 넣고 삭제하기
          urls[0].fileUrl =
            'https://kr.object.ncloudstorage.com/fancamp-images/default_thumbnail.jpg';
          urls[0].mimetype = 'image/jpeg';
        }
        const thumbnail = urls[0] ? [urls[0]] : [];
        const likeCount = await this.countLikes(post.postId);
        const commentCount = await this.countComments(post.postId);
        return {
          ...post,
          publicId: writerPublicId,
          likeCount: likeCount,
          commentCount: commentCount,
          url: thumbnail,
        };
      }),
    );
  }

  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto,
    publicId: string,
  ) {
    const user = await this.userService.findUserByPublicId(publicId);
    const post = await this.checkOwnPost(postId, user.id);
    return this.postRepository.update(post, updatePostDto);
  }

  async removePost(postId: number) {
    await this.checkPost(postId);
    return this.postRepository.delete(postId);
  }

  /* Like */
  async createLike(postId: number, publicId: string) {
    if (await this.checkPost(postId)) {
      const user = await this.userService.findUserByPublicId(publicId);
      return this.likeRepository.create(postId, user.id);
    }
  }

  async removeLike(postId: number, publicId: string) {
    if (await this.checkPost(postId)) {
      const user = await this.userService.findUserByPublicId(publicId);
      return this.likeRepository.remove(postId, user.id);
    }
  }

  async countLikes(postId: number): Promise<number> {
    return this.likeRepository.countByPostId(postId);
  }

  async findLikeByPostId(postId: number, userId: number): Promise<Boolean> {
    if (await this.likeRepository.findByPostId(postId, userId)) {
      return true;
    }
    return false;
  }

  /* Comment */
  async createComment(postId: number, content: string, publicId: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const setimentColorHex = await getSentimentColor(content);
    const comment = await this.commentRepository.create(
      postId,
      content,
      user.id,
      setimentColorHex,
    );
    return {
      ...comment,
      publicId: user.publicId,
      profileImage: user.profileImage,
    };
  }

  async updateComment(
    postId: number,
    commentId: number,
    content: string,
    publicId: string,
  ) {
    const user = await this.userService.findUserByPublicId(publicId);
    const comment = await this.checkOwnComment(commentId, user.id);
    const setimentColorHex = await getSentimentColor(content);
    return this.commentRepository.update(comment, content, setimentColorHex);
  }

  async removeComment(postId: number, commentId: number, publicId: any) {
    const user = await this.userService.findUserByPublicId(publicId);
    const comment = await this.checkOwnComment(commentId, user.id);
    return this.commentRepository.remove(comment);
  }

  async findCommentsByPostId(postId: number, cursor: string) {
    const cursorDate = new Date(cursor);
    const comments: Comment[] = await this.commentRepository.findByPostId(
      postId,
      cursorDate,
    );

    if (!comments.length) {
      return {
        cursor: cursor,
        nextCursor: null,
        result: [],
      };
    }

    const result = await Promise.all(
      comments.map(async (comment) => {
        const user = await this.userService.findUserByUserId(comment.userId);
        return {
          ...comment,
          publicId: user.publicId,
          profileImage: user.profileImage,
        };
      }),
    );

    return {
      cursor: cursor,
      nextCursor: comments.slice(-1)[0].createdAt,
      result: result,
    };
  }

  async countComments(postId: number): Promise<number> {
    return this.commentRepository.countByPostId(postId);
  }

  /* Check Post functions */
  async checkPost(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne(postId);
    if (post) {
      return post;
    }
    throw new HttpException(
      ERR_MESSAGE.POST_NOT_FOUND_BY_ID,
      HttpStatus.BAD_REQUEST,
    );
  }

  async checkOwnPost(postId: number, userId: number): Promise<Post> {
    const post = await this.checkPost(postId);
    if (post.userId === userId) {
      return post;
    }
    throw new HttpException(ERR_MESSAGE.NOT_POST_OWNER, HttpStatus.BAD_REQUEST);
  }
  /* Check Comment functions */
  async checkComment(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne(commentId);
    if (comment) {
      return comment;
    }
    throw new HttpException(
      ERR_MESSAGE.COMMENT_NOT_FOUND_BY_ID,
      HttpStatus.BAD_REQUEST,
    );
  }
  async checkOwnComment(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.checkComment(commentId);
    if (comment.userId === userId) {
      return comment;
    }
    throw new HttpException(
      ERR_MESSAGE.NOT_COMMENT_OWNER,
      HttpStatus.BAD_REQUEST,
    );
  }
}
