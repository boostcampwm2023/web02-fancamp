import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
