import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class PostTranslation {
  @PrimaryGeneratedColumn()
  postTranslationId: number;

  @Column({ type: 'varchar', nullable: true })
  languageCode: string = '';

  @Column({ type: 'text', nullable: true })
  content: string = '';

  @ManyToOne(() => Post, (post) => post.translation)
  post: Post;
}

@Entity()
export class CommentTranslation {
  @PrimaryGeneratedColumn()
  commentTranslationId: number;

  @Column({ type: 'varchar', nullable: true })
  languageCode: string = '';

  @Column({ type: 'text', nullable: true })
  content: string = '';

  @ManyToOne(() => Comment, (comment) => comment.translation)
  comment: Comment;
}
