import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsObject,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CartDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  user_name?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  artwork_id?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  product?: CartArtworks;

  @ApiPropertyOptional()
  @IsOptional()
  products?: CartArtworks[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  total_price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  storeId?: string;
}

interface CartArtworks {
  userId?: string;
  storeId?: string;
  price?: number;
  quantity?: number;
  artwork_id?: string;
  artwork_name?: string;
  description?: string;
  artwork_type?: string;
  thumbnail?: string;
  images: string[];

  tags?: string[];
  tools?: string[];
  embed_code?: string[];
  audio_video?: string[];
  animated_3d?: string[];
}
