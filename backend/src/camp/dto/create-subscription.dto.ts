import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  isInt,
  IsNumberString,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @ApiProperty()
  camperId: number;

  @IsNumberString()
  @ApiProperty()
  masterId: number;

  @IsBoolean()
  @ApiProperty()
  // TODO: default 값을 프로필 기본 이미지로 바꾸기
  isSubscribe: boolean = true;
}
