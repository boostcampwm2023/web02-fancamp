import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private sessions = [];
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserAuthDto: CreateUserAuthDto, response: Response) {
    const dto = await this.userRepository.createUser(createUserAuthDto);
    this.sessions.push(dto.email);
    response.cookie('email', dto.email);
    return dto;
  }

  async signin(signinUserAuthDto: SigninUserAuthDto, response: Response) {
    const { email, password } = signinUserAuthDto;
    const user = await this.userRepository.findUserByEmail(email);
    if (user && user.password === password) {
      //TODO: 비밀번호 암호화
      this.sessions.push(email);
      response.cookie('email', email);
      return signinUserAuthDto;
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  signout(email: string, response: Response) {
    const index = this.sessions.indexOf(email);
    if (index > -1) {
      this.sessions.splice(index, 1);
      response.clearCookie('email');
      return 'Signout';
    }
  }
}
