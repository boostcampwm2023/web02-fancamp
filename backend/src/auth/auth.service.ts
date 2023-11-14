import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository){}

  create(createUserAuthDto: CreateUserAuthDto) {
    return this.userRepository.createUser(createUserAuthDto);
  }

  signin(signinUserAuthDto: SigninUserAuthDto) {
    return signinUserAuthDto;
  }

  signout() {
    return 'Signout';
  }
}
