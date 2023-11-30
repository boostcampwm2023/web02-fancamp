import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';
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
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.userId = :masterId', { masterId })
      .orderBy('post.createdAt', 'DESC') // 역순으로 정렬
      .getMany();
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
