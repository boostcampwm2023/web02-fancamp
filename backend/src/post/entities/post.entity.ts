import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostTranslation } from './translation.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ type: 'varchar', nullable: true })
  content: string = '';

  @Column({ type: 'int', nullable: true })
  pictureCount: number = 0;

  @UpdateDateColumn({ name: 'updated _at' })
  createdAt: Date; //TODO: time type으로 바꾸기

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  campId: number;

  @Column({ type: 'boolean', nullable: false })
  isMaster: boolean;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean = false;

  @OneToMany(() => PostTranslation, (postTranslation) => postTranslation.post)
  translation: PostTranslation[];
}
