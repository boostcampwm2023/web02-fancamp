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

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly campService: CampService,
    private readonly userService: UserService,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  /* Post */
  async createPost(createPostDto: CreatePostDto, publicId: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    if (!user.isMaster) {
      throw new HttpException(
        ERR_MESSAGE.POST_WRITER_IS_NOT_MASTER,
        HttpStatus.BAD_REQUEST,
      );
    }
    const camp = await this.campService.findOne(createPostDto.campName);
    return this.postRepository.create(
      createPostDto,
      user.id,
      camp.campId,
      user.isMaster,
    );
  }

  findPost(postId: number) {
    return this.postRepository.findOne(postId);
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
