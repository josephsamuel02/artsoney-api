import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsArray,
  IsString,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Artwork_type } from "@prisma/client";

// enum Artwork_type {
//   physical,
//   digital,
// }

export class UpdateArtwork {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  artwork_id: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  storeId?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  artwork_name?: string;

  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  tools?: string[];

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  art_field?: string[];

  @ApiProperty()
  @IsNotEmpty()
  artwork_type: Artwork_type;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  visibility?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  disable_comments?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  copyright_license?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  production_files?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  co_owners?: co_owners[];

  @ApiPropertyOptional()
  @IsOptional()
  designed_for?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  appreciation?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  dimensions?: object;

  @ApiPropertyOptional()
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  embed_code?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  audio_video?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  animated_3d?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  certificate_of_authentication_type?: any;

  @ApiPropertyOptional()
  @IsOptional()
  certificate_of_authentication?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  available_quantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  currency?: any;

  @ApiPropertyOptional()
  @IsOptional()
  auction?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  likes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  views?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  comments?: comments;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  user_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profile_img?: string;

  @ApiPropertyOptional()
  @IsOptional()
  for_sale?: boolean;

  @ApiPropertyOptional()
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
