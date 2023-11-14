import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAuthDto } from 'src/auth/dto/create-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserAuthDto) {}
