import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { concatMap } from 'rxjs';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { ERR_MESSAGE } from 'src/utils/constants';

@Injectable()
export class PostRepository {
  private postRepository: Repository<Post>;

  constructor(private readonly dataSource: DataSource) {
    this.postRepository = this.dataSource.getRepository(Post);
  }

  create(
    createPostDto: CreatePostDto,
    userId: number,
    campId: number,
    isMaster: boolean,
    pictureCount: number,
  ) {
    return this.postRepository.save({
      content: createPostDto.content,
      pictureCount: pictureCount,
      userId,
      campId,
      isMaster,
      isDeleted: false,
    });
  }

  findOne(postId: number) {
    return this.postRepository.findOneBy({ postId });
  }
  findAllByMasterId(masterId: number) {
    return this.postRepository.findBy({ userId: masterId });
  }

  async update(post: Post, updatePostDto: UpdatePostDto) {
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async delete(postId: number) {
    this.postRepository.update({ postId }, { isDeleted: true });
  }
}
