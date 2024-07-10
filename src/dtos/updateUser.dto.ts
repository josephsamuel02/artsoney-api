import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEmail,
  IsObject,
  IsBoolean,
  IsArray,
} from "class-validator";

interface following {
  user_name: string;
  userId: string;
}

interface followers {
  user_name: string;
  userId: string;
}
interface socials {
  facebook: string;
  x_social: string;
  instagram: string;
  youtube: string;
  tiktok: string;
}
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
  user_name?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: any;

  @IsString()
  @IsOptional()
  profile_img?: string;

  @IsString()
  @IsOptional()
  profile_poster_img?: string;

  @IsString()
  @IsOptional()
  address?: object;

  @IsString()
  @IsOptional()
  about?: string;

  @IsObject()
  @IsOptional()
  socials?: socials;

  @IsString()
  @IsOptional()
  profession?: string[];

  @IsObject()
  @IsOptional()
  following?: following;

  @IsObject()
  @IsOptional()
  followers?: followers;

  @IsObject()
  @IsOptional()
  likes?: number;

  @IsString()
  @IsOptional()
  moodboard?: object;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  suspended?: boolean;

  @IsString()
  @IsOptional()
  authStrategy?: string;

  @IsObject()
  @IsOptional()
  interests?: string[];

  @IsObject()
  @IsOptional()
  Store?: object;

  @IsString()
  @IsArray()
  hubby?: string[];

  @IsObject()
  @IsOptional()
  Post?: object;
}
