import { Injectable, Logger } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

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
    return this.postRepository.findOne({
      where: { postId },
      relations: ['translation'],
    });
  }
  findAllByMasterId(masterId: number) {
    return this.postRepository.find({
      where: [
        {
          userId: masterId,
        },
      ],
      relations: ['translation'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findAll(cursorDate: Date) {
    return this.postRepository.find({
      where: [
        {
          isDeleted: false,
          createdAt: LessThan(cursorDate), // cursor 이후의 글 가져오기
        },
      ],
      order: {
        createdAt: 'DESC', // 내림차순 정렬하여 최신글이 먼저 오도록 함
      },
      take: 20, // 최대 20개의 결과만 가져오도록 제한
      relations: ['translation'],
    });
  }

  async update(post: Post, updatePostDto: UpdatePostDto) {
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async delete(postId: number) {
    this.postRepository.update({ postId }, { isDeleted: true });
  }
}
