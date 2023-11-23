import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column({ type: 'varchar', nullable: false })
  imageUrl: string;

  @Column({ type: 'int', nullable: false })
  postId: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted: boolean;
}
