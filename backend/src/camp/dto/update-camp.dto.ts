import { PartialType } from '@nestjs/swagger';
import { CreateCampDto } from './create-camp.dto';

export class UpdateCampDto extends PartialType(CreateCampDto) {}
