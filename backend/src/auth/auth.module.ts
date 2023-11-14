import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
