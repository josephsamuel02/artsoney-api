import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsArray,
  IsString,
  IsBoolean,
} from "class-validator";

export class UpdateArtwork {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  artwork_id: string;

  @IsString()
  @IsNotEmpty()
  storeId?: string;

  @IsString()
  @IsOptional()
  artwork_name?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsOptional()
  tools?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  art_field?: string[];

  @IsString()
  @IsOptional()
  visibility?: string;

  @IsOptional()
  @IsBoolean()
  disable_comments?: boolean;

  @IsOptional()
  copyright_license?: string[];

  @IsOptional()
  @IsObject()
  co_owners?: co_owners[];

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
  comments?: comments;

  @IsOptional()
  @IsObject()
  comment?: string;

  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  profile_img?: string;

  @IsOptional()
  for_sale?: boolean;

  @IsOptional()
  draft?: boolean;
}

interface co_owners {
  profile_img?: string;
  user_name: string;
  userId: string;
}

interface comments {
  profile_img?: string;
  userId: string;
  user_name?: string;
  comment?: string;
  likes?: number;
}
