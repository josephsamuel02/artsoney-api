import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
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
  product_id?: string;

  @IsString()
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
  product_id?: string;
  product_image?: string[];
  product_title?: string;
  price?: number;
  quantity?: number;
}
