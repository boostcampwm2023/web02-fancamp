import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCampDto } from './create-camp.dto';
import { IsString } from 'class-validator';

export class UpdateCampDto extends PartialType(CreateCampDto) {
  @IsString()
  @ApiProperty()
  content?: string = '';
}
