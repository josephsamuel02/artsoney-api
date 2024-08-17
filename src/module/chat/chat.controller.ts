import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  Param,
  Put,
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateChatMessageDto,
  GetChatMessageDto,
} from "src/dtos/chatMessage.dto";

@ApiTags("chat")
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async createConversation(
    @Body() createChatMessageDto: CreateChatMessageDto,
  ): Promise<any> {
    return this.chatService.createConversation(createChatMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  public async sendMessage(
    @Body() getChatMessageDto: GetChatMessageDto,
  ): Promise<any> {
    return this.chatService.sendMessage(getChatMessageDto);
  }

  @Get()
  async getMessages(@Body() getChatMessageDto: GetChatMessageDto) {
    return this.chatService.getMessages(getChatMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":userId")
  async getAllMessagesForUser(@Param("userId") userId: string) {
    return this.chatService.getAllMessagesForUser(userId);
  }
}
