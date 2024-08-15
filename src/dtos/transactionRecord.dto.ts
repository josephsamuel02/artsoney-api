import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";

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
  @IsOptional()
  @IsString()
  transaction_id?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  buyer_information?: BuyerInformation;

  @IsOptional()
  seller_information?: SellerInformation;

  @IsOptional()
  products: Product;

  @IsOptional()
  transaction_total_price?: number;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsEnum(TransactionStatus)
  transaction_status?: TransactionStatus;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transaction_type: TransactionType;

  @IsOptional()
  transaction_image?: string;

  @IsOptional()
  remark?: string;
}
