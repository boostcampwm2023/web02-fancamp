import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @ApiProperty()
  content?: string = '';

  @IsNumber()
  @ApiProperty()
  postId: number = 0;
}
