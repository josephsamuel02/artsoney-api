import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsArray,
  IsString,
  IsBoolean,
} from "class-validator";

export class PostArtworkDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  artwork_name: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  tools?: string[];

  @IsOptional()
  description?: string;

  @IsOptional()
  art_field?: string[];

  @IsOptional()
  visibility?: string;

  @IsOptional()
  @IsBoolean()
  disable_comments?: boolean;

  @IsOptional()
  copyright_license?: any;

  @IsOptional()
  @IsObject()
  co_owners?: any;

  @IsOptional()
  designed_for?: string[];

  @IsOptional()
  appreciation?: string[];

  @IsOptional()
  @IsObject()
  dimensions?: object;

  @IsOptional()
  images?: string[];

  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  embed_code?: string[];

  @IsOptional()
  audio_video?: string[];

  @IsOptional()
  animated_3d?: string[];

  @IsOptional()
  certificate_of_authentication_type?: any;

  @IsOptional()
  certificate_of_authentication?: string[];

  @IsOptional()
  available_quantity?: number;

  @IsOptional()
  currency?: any;

  @IsOptional()
  auction?: boolean;

  @IsOptional()
  price?: number;

  @IsOptional()
  likes?: number;

  @IsOptional()
  views?: number;

  @IsOptional()
  @IsObject()
  comments?: object;

  @IsOptional()
  for_sale?: boolean;

  @IsOptional()
  draft?: boolean;
}
