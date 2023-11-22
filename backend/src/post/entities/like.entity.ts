import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  commentId: number;

  @UpdateDateColumn({ name: 'updated _at' })
  createdAt: string; //TODO: time type으로 바꾸기

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  postId: number;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean = false;
}
