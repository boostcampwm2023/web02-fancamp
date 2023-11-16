import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chatId: number;

  @Column({ type: 'varchar', nullable: false })
  createdAt: string; //TODO: time type으로 바꾸기

  @Column({ type: 'varchar', nullable: true })
  stringContent: string = '';

  @Column({ type: 'varchar', nullable: true })
  picContent: string = '';

  @Column({ type: 'varchar', nullable: false })
  sender: string;

  @Column({ type: 'varchar', nullable: false })
  masterId: string;
}
