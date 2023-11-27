import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column({ type: 'varchar', nullable: false })
  imageUrl: string;

  @Column({ type: 'int', nullable: true })
  postId: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted: boolean;
}
