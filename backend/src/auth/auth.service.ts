import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private sessions = [];
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserAuthDto: CreateUserAuthDto) {
    createUserAuthDto.password = await bcrypt.hash(
      createUserAuthDto.password,
      10,
    ); // 암호화 해주기
    const dto = await this.userRepository.createUser(createUserAuthDto);
    this.sessions.push(dto.email);
    return {
      email: dto.email,
      publicId: dto.publicId,
      isMaster: dto.isMaster
    };
  }

  async signin(signinUserAuthDto: SigninUserAuthDto) {
    const { email, password } = signinUserAuthDto;
    const user = await this.userRepository.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      //TODO: 비밀번호 암호화
      this.sessions.push(email);
      return  {
        email: user.email,
        publicId: user.publicId,
        isMaster: user.isMaster
      };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  signout(email: string) {
    const index = this.sessions.indexOf(email);
    if (index > -1) {
      this.sessions.splice(index, 1);
    }
  }
}
