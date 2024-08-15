import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum order_status {
  PENDING,
  SHIPPED,
  DELIVERED,
  CANCELLED,
}

interface Shipping {
  country?: string;
  state?: string;
  address?: string;
}

interface Billing {
  holders_name: string;
  card_number: string;
  cvv: string;
  exp_d: string;
}

interface products {
  userId?: string;
  storeId?: string;
  product_id?: string;
  product_name?: string;
  product_image: string[];
  product_title?: string;
  price?: number;
  quantity?: number;
}

export class OrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  order_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  products: products[];

  @ApiPropertyOptional()
  @IsOptional()
  billing?: Billing;

  @ApiPropertyOptional()
  @IsOptional()
  shipping?: Shipping;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  total_price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(order_status)
  status?: any | string | order_status; // Use the imported Prisma enum
}
