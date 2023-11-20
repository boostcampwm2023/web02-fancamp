import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscribe {
  @PrimaryGeneratedColumn()
  subscribeId: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  camperId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  masterId: string;

  @Column({ type: 'boolean', nullable: false })
  isSubscribe: boolean = true;
}
