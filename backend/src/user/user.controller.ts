import {
  Controller,
  Get,
  Body,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(@Req() request: Request) {
    return this.userService.get(request.cookies['publicId']);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(
      file,
      request.cookies['publicId'],
      updateUserDto,
    );
  }
}
