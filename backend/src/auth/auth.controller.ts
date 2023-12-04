import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  HttpCode,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ERR_MESSAGE } from 'src/utils/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createUserAuthDto: CreateUserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dto = await this.authService.create(createUserAuthDto);
    response
      .cookie('publicId', dto.publicId)
      .cookie('isMaster', dto.isMaster)
      .status(200)
      .json(dto);
  }

  @Post('/users/signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body() signinUserAuthDto: SigninUserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dto = await this.authService.signin(signinUserAuthDto);
    response
      .cookie('publicId', dto.publicId)
      .cookie('isMaster', dto.isMaster)
      .status(200)
      .json(dto);
  }

  @Get('/users/signout')
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.signout(request.cookies['publicId']);
    response.clearCookie('publicId').clearCookie('isMaster');
  }

  @Get('/users')
  async checkLogin(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.checkLogin(
      request.cookies['publicId'],
    );
    if (result) {
      return result;
    }
    response.clearCookie('publicId').clearCookie('isMaster');
    throw new UnauthorizedException('not logined');
  }

  @Post('/users/duplicateEmail')
  @HttpCode(200)
  async duplicateEmail(@Body('email') email: string) {
    const user = await this.authService.existUserByEmail(email);
    if (user) {
      return { duplicateEmail: true };
    } else {
      return { duplicateEmail: false };
    }
  }

  @Post('/users/duplicatePublicId')
  @HttpCode(200)
  async duplicatePublicId(@Body('publicId') publicId: string) {
    const user = await this.authService.existUserByPublicId(publicId);
    if (user) {
      return { duplicatePublicId: true };
    } else {
      return { duplicatePublicId: false };
    }
  }

  @Get('/users/profileImage/:publicId')
  async getProfileImage(@Param('publicId') publicId: string) {
    const user = await this.authService.existUserByPublicId(publicId);
    if (user) {
      return { profileImage: user.profileImage };
    } else {
      throw new HttpException(
        ERR_MESSAGE.USER_NOT_FOUND_BY_ID,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
