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

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository,
    private readonly campService: CampService,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

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
    const post = await this.postRepository.create(
      createPostDto,
      user.id,
      camp.campId,
      user.isMaster,
      files.length,
    );
    await this.imageService.uploadFiles(files, post.postId, post.campId);
    return post;
  }
  async findPostWithUrls(postId: number) {
    const post = await this.findPost(postId);
    const likesCount = await this.countLikes(post.postId);
    const commentsCount = await this.countComments(post.postId);
    const commets = await this.findCommentsByPostId(post.postId);
    const urls = await this.imageService.findUrlsByPostId(postId);
    return {
      ...post,
      likesCount: likesCount,
      commentsCount: commentsCount,
      urls: urls,
      comments: commets,
    };
  }

  findPost(postId: number) {
    return this.postRepository.findOne(postId);
  }

  async findAllPostsByCampName(campName: string) {
    //TODO: 쿠키 분석해서 구독중인지 확인
    const camp = await this.campService.findOne(campName);
    const posts = await this.postRepository.findAllByMasterId(camp.masterId);
    console.log('this is posts\n', posts);
    return await Promise.all(
      posts.map(async (post) => {
        console.log(post);
        const urls = await this.imageService.findUrlsByPostId(post.postId); //TODO: 이미지 없으면
        console.log(urls[0]);
        const likesCount = await this.countLikes(post.postId);
        const commentsCount = await this.countComments(post.postId);
        return {
          ...post,
          likesCount: likesCount,
          commentsCount: commentsCount,
          url: urls[0],
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
  async findLikesByPostId(postId: number) {
    return this.likeRepository.findLikesByPostId(postId);
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

  /* Comment */
  async createComment(createCommentDto: CreateCommentDto, publicId: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    return this.commentRepository.create(createCommentDto, user.id);
  }

  async updateComment(
    commentId: number,
    updateCommentDto: UpdateCommenttDto,
    publicId: string,
  ) {
    const user = await this.userService.findUserByPublicId(publicId);
    const comment = await this.checkOwnComment(commentId, user.id);
    return this.commentRepository.update(comment, updateCommentDto);
  }

  async removeComment(commentId: number, publicId: any) {
    const user = await this.userService.findUserByPublicId(publicId);
    const comment = await this.checkOwnComment(commentId, user.id);
    return this.commentRepository.remove(comment);
  }

  async findCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.findByPostId(postId);
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

  // async uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   let urls = [];
  //   if (!files) {
  //     return 'false';
  //   }
  //   await Promise.all(
  //     files.map(async (file) => {
  //       const url = await this.imageService.uploadFile(file);
  //       urls.push(url);
  //     }),
  //   );
  //   console.log(urls);
  // }
}
