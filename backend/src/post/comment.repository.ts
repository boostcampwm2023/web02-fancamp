import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { concatMap } from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentRepository {
  private commentRepository: Repository<Comment>;

  constructor(private readonly dataSource: DataSource) {
    this.commentRepository = this.dataSource.getRepository(Comment);
  }

  create(createCommentDto: CreateCommentDto, userId: number) {
    return this.commentRepository.save({
      content: createCommentDto.content,
      userId,
      postId: createCommentDto.postId,
      isDeleted: false,
    });
  }
}
