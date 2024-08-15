import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

interface Wallet {
  available_balance?: number;
  pending_balance?: number;
}

interface BankInformation {
  bank_name?: string;
  account_name?: string;
  account_number?: number;
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
  @IsNumber()
  artsony_score?: number;

  @IsOptional()
  bank_information?: BankInformation[];
}
