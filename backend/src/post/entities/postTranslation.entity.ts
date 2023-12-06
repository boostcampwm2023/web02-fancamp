import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

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
