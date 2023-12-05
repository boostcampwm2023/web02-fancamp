import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Camp {
  @PrimaryGeneratedColumn()
  campId: number;

  @Index('campName_fulltext_index', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  campName: string;

  @Column({ type: 'int', nullable: false, unique: true })
  masterId: number;

  @Column({ type: 'varchar', nullable: true })
  bannerImage: string = '';

  @Index('content_fulltext_index', { fulltext: true, parser: 'ngram' })
  @Column({ type: 'varchar', nullable: false })
  content: string = '';
}
