import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SigninUserAuthDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @Length(4, 20)
    @ApiProperty()
    password: string;
}
