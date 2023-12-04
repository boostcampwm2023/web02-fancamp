import { Camp } from 'src/camp/entities/camp.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  chatName: string = '';

  @Column({ type: 'varchar', nullable: false, unique: true })
  publicId: string;

  @Column({ type: 'varchar', nullable: false })
  profileImage: string;

  @Column({ type: 'boolean', nullable: false })
  isMaster: boolean;
}
