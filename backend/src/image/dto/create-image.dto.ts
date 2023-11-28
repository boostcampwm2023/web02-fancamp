import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, isBoolean } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @ApiProperty()
  fileUrl: string;

  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsString()
  @ApiProperty()
  mimetype: string;
}
