import { Controller, Get, Post, Body, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  // @Redirect('/index', 301) //TODO: 홈으로 가게끄
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

  @Post('/user/signin')
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

  @Get('/user/signout')
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.signout(request.cookies['email']);
    response.clearCookie('email')
      .clearCookie('publicId');
  }
}
