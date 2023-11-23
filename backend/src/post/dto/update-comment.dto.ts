import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommenttDto extends PartialType(CreateCommentDto) {
  @IsString()
  @ApiProperty()
  content: string = '';

  @IsNumber()
  @ApiProperty()
  postId: number;
}
