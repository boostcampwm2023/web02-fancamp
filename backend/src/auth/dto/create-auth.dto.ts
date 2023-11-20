import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserAuthDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @Length(4, 20)
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    chatName: string

    @IsString()
    @ApiProperty()
    publicId: string

    @IsString()
    @ApiProperty()
    // TODO: default 값을 프로필 기본 이미지로 바꾸기
    profileImage: string = "";

    @ApiProperty()
    @IsBoolean()
    isMaster: boolean = false;
}

