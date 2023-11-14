import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  create(createUserAuthDto: CreateUserAuthDto) {
    return createUserAuthDto;
  }

  signin(signinUserAuthDto: SigninUserAuthDto) {
    return signinUserAuthDto;
  }

  signout() {
    return 'Signout';
  }
}
