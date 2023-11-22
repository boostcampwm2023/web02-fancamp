import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, isBoolean } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsNumber()
  @ApiProperty()
  postId: number;
}
