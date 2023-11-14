import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateUserAuthDto) {}
