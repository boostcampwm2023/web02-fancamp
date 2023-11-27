import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserAuthDto } from 'src/auth/dto/create-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserAuthDto) {
  @IsString()
  @ApiProperty()
  content?: string = '';
}
