import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UserRepository {
  private usersRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User);
  }

  createUser(createUserAuthDto: CreateUserAuthDto) {
    return this.usersRepository.save(createUserAuthDto);
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findUserByPublicId(publicId: string) {
    return this.usersRepository.findOneBy({ publicId });
  }

  findUserByUserId(userId: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  async update(user: User) {
    await this.usersRepository.save(user);
    return user;
  }
}
