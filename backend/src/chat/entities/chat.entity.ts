import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chatId: number;

  @UpdateDateColumn({ name: 'updated _at' })
  createdAt: Date; //TODO: time type으로 바꾸기

  @Column({ type: 'varchar', nullable: true })
  stringContent: string = '';

  @Column({ type: 'varchar', nullable: true })
  picContent: string = '';

  @Column({ type: 'int', nullable: false })
  senderId: number;

  @Column({ type: 'int', nullable: false })
  masterId: number;
}
