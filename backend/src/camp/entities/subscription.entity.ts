import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['camperId', 'masterId'], { unique: true })
export class Subscription {
  @PrimaryGeneratedColumn()
  subscriptionId: number;

  @Column({ type: 'int', nullable: false })
  camperId: number;

  @Column({ type: 'int', nullable: false })
  masterId: number;

  @Column({ type: 'boolean', nullable: false })
  isSubscribe: boolean = true;
}
