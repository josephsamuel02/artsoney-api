import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

interface Wallet {
  available_balance?: number;
  pending_balance?: number;
}

interface BankInformation {
  bank_name?: string;
  account_name?: string;
  account_number?: string;
}

interface Reviews {
  user_name?: string;
  user_id: string;
  profile_image?: string;
  rating?: number;
  review?: string;
}

interface Rating {
  artsony_score?: number;
  art_rating?: number;
  customer_satisfaction?: number;
  delivery_rating?: number;
  reviews?: Reviews[];
}

export class SalesDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsOptional()
  storeId?: string;

  @IsOptional()
  @IsNumber()
  total_revenue?: number;

  @IsOptional()
  wallet?: Wallet;

  @IsOptional()
  @IsNumber()
  sales?: number;

  @IsOptional()
  rating?: Rating;

  @IsOptional()
  bank_information?: BankInformation[];
}
