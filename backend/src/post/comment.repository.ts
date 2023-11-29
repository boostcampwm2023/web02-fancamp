import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { concatMap } from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommenttDto } from './dto/update-comment.dto';
@Injectable()
export class CommentRepository {
  private commentRepository: Repository<Comment>;

  constructor(private readonly dataSource: DataSource) {
    this.commentRepository = this.dataSource.getRepository(Comment);
  }

  create(
    postId: number,
    content: string,
    userId: number,
    setimentColorHex: string,
  ) {
    return this.commentRepository.save({
      content,
      userId,
      postId,
      setimentColorHex,
      isDeleted: false,
    });
  }
  findOne(commentId: number) {
    return this.commentRepository.findOneBy({ commentId });
  }

  update(comment: Comment, content: string, setimentColorHex: string) {
    comment.content = content;
    comment.setimentColorHex = setimentColorHex;
    return this.commentRepository.save(comment);
  }

  remove(comment: Comment) {
    comment.isDeleted = true;
    return this.commentRepository.save(comment);
  }

  findByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.findBy({ postId, isDeleted: false });
  }

  countByPostId(postId: number): number | PromiseLike<number> {
    return this.commentRepository.count({
      where: { postId, isDeleted: false },
    });
  }
}
