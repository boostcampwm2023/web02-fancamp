import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
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
  create(
    @Body() createUserAuthDto: CreateUserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.create(createUserAuthDto, response);
  }

  @Post('/user/signin')
  signin(
    @Body() signinUserAuthDto: SigninUserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signin(signinUserAuthDto, response);
  }

  @Get('/user/signout')
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signout(request.cookies['email'], response);
  }
}
