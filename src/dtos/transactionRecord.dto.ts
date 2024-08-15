import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

interface BuyerInformation {
  userId: string;
  user_name?: string;
  profile_image?: string;
  buyer_account_name?: string;
}

interface SellerInformation {
  userId: string;
  user_name?: string;
  profile_image?: string;
  seller_account_name?: string;
}

interface Product {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}

enum TransactionStatus {
  PENDING = "PENDING",
  FAILED = "FAILED",
  SUCCESSFUL = "SUCCESSFUL",
}

enum TransactionType {
  PAYMENT = "PAYMENT",
  WITHDRAWAL = "WITHDRAWAL",
  FUND_WALLET = "FUND_WALLET",
}

export class TransactionsRecordDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transaction_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  buyer_information?: BuyerInformation;

  @ApiPropertyOptional()
  @IsOptional()
  seller_information?: SellerInformation;

  @ApiPropertyOptional()
  @IsOptional()
  products: Product;

  @ApiPropertyOptional()
  @IsOptional()
  transaction_total_price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TransactionStatus)
  transaction_status?: TransactionStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  transaction_type: TransactionType;

  @ApiPropertyOptional()
  @IsOptional()
  transaction_image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  remark?: string;
}
