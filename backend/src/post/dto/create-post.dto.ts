import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  content: string = '';

  @IsString()
  @ApiProperty()
  campName: string;
}
