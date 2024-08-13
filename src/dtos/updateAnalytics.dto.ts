import { Socials } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDateString,
  IsObject,
  IsArray,
  IsBoolean,
} from "class-validator";
import { Address } from "cluster";

export class UpdateAnalyticsDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

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
  date_of_birth?: Date;

  @IsString()
  @IsOptional()
  address?: Address;

  @IsString()
  @IsOptional()
  profile_img?: string;

  @IsString()
  @IsOptional()
  profile_poster_img?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  art_focus?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsOptional()
  website: string[];

  @IsObject()
  @IsOptional()
  socials?: Socials;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  time_zone?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsOptional()
  profession?: string[];

  @IsObject()
  @IsOptional()
  likes?: number;

  @IsOptional()
  interests?: string[];

  @IsString()
  @IsArray()
  @IsOptional()
  hubby?: string[];

  @IsObject()
  @IsOptional()
  Post?: object;

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
  Store?: object;
}
