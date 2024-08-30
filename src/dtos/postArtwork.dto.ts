import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsArray,
  IsString,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum Artwork_type {
  physical,
  digital,
}

export class PostArtworkDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  artwork_name: string;

  @ApiProperty()
  @IsNotEmpty()
  artwork_type: Artwork_type;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tools?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  art_field?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  visibility?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  disable_comments?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  copyright_license?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  co_owners?: any;

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
  comments?: object;

  @ApiPropertyOptional()
  @IsOptional()
  for_sale?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  draft?: boolean;
}
