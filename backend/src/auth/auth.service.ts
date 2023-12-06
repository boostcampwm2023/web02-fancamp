import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { CampService } from 'src/camp/camp.service';
@Injectable()
export class AuthService {
  private sessions = [];
  constructor(
    private readonly userRepository: UserRepository,
    private readonly campService: CampService,
  ) {}

  async create(createUserAuthDto: CreateUserAuthDto) {
    createUserAuthDto.password = await bcrypt.hash(
      createUserAuthDto.password,
      10,
    ); // 암호화 해주기
    const { id, publicId, email, isMaster, chatName } =
      await this.userRepository.createUser(createUserAuthDto);
    this.sessions.push(publicId);
    if (isMaster) {
      await this.campService.create({
        campName: publicId,
        bannerImage: '',
        masterId: id,
        content: '',
      });
    }
    return {
      publicId,
      email,
      isMaster,
      chatName,
    };
  }

  async signin(signinUserAuthDto: SigninUserAuthDto) {
    const { email, password } = signinUserAuthDto;
    const user = await this.userRepository.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      //TODO: 비밀번호 암호화
      const { publicId, isMaster, chatName } = user;
      this.sessions.push(publicId);
      return {
        publicId,
        email,
        isMaster,
        chatName,
      };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  signout(publicId: string) {
    const index = this.sessions.indexOf(publicId);
    if (index > -1) {
      this.sessions.splice(index, 1);
    }
  }

  async checkLogin(publicId: string) {
    if (this.validateUser(publicId)) {
      const { email, isMaster, chatName } =
        await this.userRepository.findUserByPublicId(publicId);
      return {
        publicId,
        email,
        isMaster,
        chatName,
      };
    }
  }

  validateUser(publicId: string) {
    return this.sessions.includes(publicId);
  }

  existUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  existUserByPublicId(publicId: string) {
    return this.userRepository.findUserByPublicId(publicId);
  }
}
