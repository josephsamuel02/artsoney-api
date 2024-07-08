import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEmail,
} from "class-validator";
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

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
