import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateChatDto {
  @IsString()
  @ApiProperty()
  stringContent: string = '';

  @IsString()
  @ApiProperty()
  picContent: string = '';

  @IsNumber()
  @ApiProperty()
  senderId: number;

  @IsNumber()
  @ApiProperty()
  masterId: number;
}
