import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ImageModule],
  controllers: [UserController],
  providers: [UserService, TypeOrmModule, UserRepository],
  exports: [UserService],
})
export class UserModule {}
