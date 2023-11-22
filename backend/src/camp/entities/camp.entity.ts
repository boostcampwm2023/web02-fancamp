import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Camp {
  @PrimaryGeneratedColumn()
  campId: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  campName: string;

  @Column({ type: 'int', nullable: false, unique: true })
  masterId: number;

  @Column({ type: 'varchar', nullable: false })
  bannerImage: string = '';
}
