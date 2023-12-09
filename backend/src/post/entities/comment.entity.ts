import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentTranslation } from './translation.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ type: 'varchar', nullable: true })
  content: string = '';

  @UpdateDateColumn({ name: 'updated _at' })
  createdAt: Date;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  postId: number;

  @Column({ type: 'boolean', nullable: false })
  isDeleted: boolean = false;

  @Column({ type: 'varchar', nullable: false })
  setimentColorHex: string;

  @OneToMany(
    () => CommentTranslation,
    (commentTranslation) => commentTranslation.comment,
  )
  translation: CommentTranslation[];
}
