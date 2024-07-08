import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEmail,
} from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: string;
}
