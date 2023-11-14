export class CreateUserAuthDto {
    // @IsEmail()
    email: string;

    // @IsString()
    // @Length(4, 20)
    password: string;

    // @IsString()
    username: string

    // @IsString()
    profileImage: string
}
