import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  content: string = '';

  @IsNumber()
  @ApiProperty()
  picCnt: number = 0;

  @IsString()
  @ApiProperty()
  campName: string;
}
