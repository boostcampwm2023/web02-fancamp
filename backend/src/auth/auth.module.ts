import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService, UserRepository],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
