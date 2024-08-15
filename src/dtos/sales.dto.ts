import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  storeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  total_revenue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  wallet?: Wallet;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sales?: number;

  @ApiPropertyOptional()
  @IsOptional()
  rating?: Rating;

  @ApiPropertyOptional()
  @IsOptional()
  bank_information?: BankInformation[];
}
