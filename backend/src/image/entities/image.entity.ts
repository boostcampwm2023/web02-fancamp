import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column({ type: 'varchar', nullable: false })
  fileUrl: string;

  @Column({ type: 'int', nullable: true })
  postId: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted: boolean;

  @Column({ type: 'varchar', nullable: true })
  mimetype: string;
}
