import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

interface Content {
  user_id?: string;
  text?: string;
  video?: string;
  url?: string;
  audio?: string;
  image?: string;
  gif?: string;
  svg?: string;
}

export class CreateChatMessageDto {
  @ApiProperty({
    description: "Sender of the chat message",
  })
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty({
    description: "Receiver of the chat message",
  })
  @IsNotEmpty()
  @IsString()
  receiver: string;

  @ApiProperty({
    description: "Content of the chat message",
  })
  @IsNotEmpty()
  content?: Content[];

  @ApiPropertyOptional({
    description: "the text message",
  })
  @IsOptional()
  @IsString()
  text?: string;
}

export class GetChatMessageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  receiver?: string;

  @ApiPropertyOptional()
  @IsOptional()
  content?: Content[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class SendChatMessageDto {
  @ApiProperty({
    description: "id of the conversation",
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: "id of message sender",
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiPropertyOptional({
    description: "the text message",
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({
    description: "any url/link",
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({
    description: "image url",
  })
  @IsOptional()
  @IsString()
  image?: string;
}
