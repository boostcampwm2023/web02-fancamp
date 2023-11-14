import { ApiProperty } from '@nestjs/swagger';

export class SigninUserAuthDto {
    // @IsEmail()
    @ApiProperty()
    email: string;

    // @IsString()
    // @Length(4, 20)
    @ApiProperty()
    password: string;
}
