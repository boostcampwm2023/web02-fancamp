import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  isInt,
  IsNumberString,
} from 'class-validator';

export class CreateCampDto {
  @IsString()
  @ApiProperty()
  campName: string;

  @IsString()
  @ApiProperty()
  // TODO: default 값을 프로필 기본 이미지로 바꾸기
  bannerImage: string = '';
}
