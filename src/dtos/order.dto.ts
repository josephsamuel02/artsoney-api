import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

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
  @IsOptional()
  @IsString()
  order_id?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  products: products[];

  @IsOptional()
  billing?: Billing;

  @IsOptional()
  shipping?: Shipping;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  total_price?: number;

  @IsOptional()
  @IsEnum(order_status)
  status?: any | string | order_status; // Use the imported Prisma enum
}
