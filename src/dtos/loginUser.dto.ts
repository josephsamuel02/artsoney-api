import { IsString, IsNotEmpty, IsEmail } from "class-validator";
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  new_password: string;

  @IsNotEmpty()
  old_password: string;
}
