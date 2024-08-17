import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CreateChatMessageDto,
  GetChatMessageDto,
} from "src/dtos/chatMessage.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly mongoDBService: MongoDBService,
  ) {}

  async createConversation(createChatMessageDto: CreateChatMessageDto) {
    try {
      const conversation = await this.prisma.chat.create({
        data: {
          sender: createChatMessageDto.sender,
          receiver: createChatMessageDto.receiver,
        },
      });
      if (!conversation) {
        return new BadRequestException("unable to create conversation");
      }

      return {
        status: 200,
        message: "conversation created",
        data: conversation,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async sendMessage(getChatMessageDto: GetChatMessageDto) {
    try {
      const conversation = await this.prisma.chat.findFirst({
        where: {
          AND: [
            { sender: getChatMessageDto.sender },
            { receiver: getChatMessageDto.receiver },
          ],
        },
      });

      if (!conversation) {
        return this.prisma.chat.create({
          data: {
            sender: getChatMessageDto.sender,
            receiver: getChatMessageDto.receiver,
          },
        });
      }

      return this.prisma.chat.update({
        where: { id: getChatMessageDto.id },

        data: {
          content: { push: getChatMessageDto.content },
        },
      });
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async getMessages(getChatMessageDto: GetChatMessageDto) {
    try {
      const page = getChatMessageDto.page || 1;
      const limit = getChatMessageDto.limit || 10;
      if (page < 1 || limit < 1) {
        throw new BadRequestException(
          "Page number and limit must be greater than 0",
        );
      }
      const skip = (page - 1) * limit;
      const ChatMessages = await this.prisma.chat.findMany({
        where: {
          AND: [
            { sender: getChatMessageDto.sender },
            { receiver: getChatMessageDto.receiver },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: skip,
        take: limit,
      });

      if (!ChatMessages || ChatMessages.length === 0) {
        return new NotFoundException("chats not found");
      }

      return {
        status: 200,
        message: "success",
        data: ChatMessages,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async getAllMessagesForUser(userId: string) {
    try {
      const page = 1;
      const limit = 20;
      if (page < 1 || limit < 1) {
        throw new BadRequestException(
          "Page number and limit must be greater than 0",
        );
      }
      const skip = (page - 1) * limit;

      const ChatMessages = await this.prisma.chat.findMany({
        where: {
          OR: [{ sender: userId }, { receiver: userId }],
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: skip,
        take: limit,
      });

      if (!ChatMessages || ChatMessages.length === 0) {
        throw new NotFoundException("Chats not found");
      }

      return {
        status: 200,
        message: "success",
        data: ChatMessages,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
