import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  user_name?: string;

  @IsString()
  @IsOptional()
  product_id?: string;

  @IsString()
  product?: CartArtworks;

  @IsOptional()
  products?: CartArtworks[];

  @IsOptional()
  @IsNumber()
  total_price?: number;

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
