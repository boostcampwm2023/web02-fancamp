import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @ApiProperty()
  stringContent: string = '';

  @IsString()
  @ApiProperty()
  picContent: string = '';

  @IsString()
  @ApiProperty()
  sender: string;

  @IsString()
  @ApiProperty()
  masterId: string;
}
