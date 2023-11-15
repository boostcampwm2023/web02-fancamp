import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAuthDto {
    // @IsEmail()
    @ApiProperty()
    email: string;

    // @IsString()
    // @Length(4, 20)
    @ApiProperty()
    password: string;

    // @IsString()
    @ApiProperty()
    username: string

    // @IsString()
    @ApiProperty()
    profileImage: string;
    
    @ApiProperty()
    isMaster: boolean;
}

