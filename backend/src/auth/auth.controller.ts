import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SigninUserAuthDto } from './dto/signin-auth.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('/user')
  create(@Body() createUserAuthDto: CreateUserAuthDto) {
    return this.authService.create(createUserAuthDto);
  }

  @Post('/user/signin')
  signin(@Body() signinUserAuthDto: SigninUserAuthDto) {
    return this.authService.signin(signinUserAuthDto);
  }
  @Get('/user/signout')
  signout() {
    return this.authService.signout();
  }

}
