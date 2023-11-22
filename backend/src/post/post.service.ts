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
import { ERR_MESSAGE } from 'src/constants';
import { Certificate } from 'crypto';
import { Post } from './entities/post.entity';

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
    await this.checkOwnPost(createCommentDto.postId, user.id);
    return this.commentRepository.create(createCommentDto, user.id);
  }

  /* Check functions */
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
}
