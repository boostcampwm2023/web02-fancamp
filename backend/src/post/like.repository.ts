import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { concatMap } from 'rxjs';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeRepository {
  private likeRepository: Repository<Like>;

  constructor(private readonly dataSource: DataSource) {
    this.likeRepository = this.dataSource.getRepository(Like);
  }

  create(postId: number, userId: number) {
    return this.likeRepository.save({ postId, userId, isDeleted: false });
  }

  remove(postId: number, userId: number) {
    return this.likeRepository.update({ postId, userId }, { isDeleted: true });
  }
}