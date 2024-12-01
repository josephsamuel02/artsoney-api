import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import {
  CreateChatMessageDto,
  GetChatMessageDto,
  SendChatMessageDto,
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
      const { sender, receiver, text } = createChatMessageDto;

      // Initialize the content array
      const contentArray = [];

      if (text) {
        contentArray.push({
          user_id: sender,
          text: text,
        });
      }

      const conversation = await this.prisma.chat.create({
        data: {
          sender: sender,
          receiver: receiver,
          content: contentArray, // Initialize the content field as an array
        },
      });

      if (!conversation) {
        throw new BadRequestException("Unable to create conversation");
      }

      return {
        status: 200,
        message: "Conversation created",
        data: conversation,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
  async createOrUpdateConversation(createChatMessageDto: CreateChatMessageDto) {
    try {
      const { sender, receiver, text } = createChatMessageDto;

      // Prepare the new content to push
      const contentToPush = text
        ? {
            user_id: sender,
            text: text,
          }
        : null;

      if (!contentToPush) {
        throw new BadRequestException("Content cannot be empty");
      }

      // Check if a conversation between sender and receiver exists
      const existingConversation = await this.prisma.chat.findFirst({
        where: {
          OR: [
            { sender, receiver },
            { sender: receiver, receiver: sender }, // Handle bidirectional relationships
          ],
        },
      });

      if (existingConversation) {
        // If a conversation exists, update it with the new content
        const updatedConversation = await this.prisma.chat.update({
          where: { id: existingConversation.id },
          data: {
            content: {
              push: contentToPush, // Push new content to the array
            },
          },
        });

        return {
          status: 200,
          message: "Conversation updated",
          data: updatedConversation,
        };
      } else {
        // If no conversation exists, create a new one
        const newConversation = await this.prisma.chat.create({
          data: {
            sender,
            receiver,
            content: [contentToPush], // Initialize content as an array with the new message
          },
        });

        return {
          status: 200,
          message: "Conversation created",
          data: newConversation,
        };
      }
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async getAllMessagesForUser(getChatMessageDto: GetChatMessageDto) {
    try {
      const page = 1;
      const limit = 50;
      if (page < 1 || limit < 1) {
        throw new BadRequestException(
          "Page number and limit must be greater than 0",
        );
      }
      const skip = (page - 1) * limit;

      // Fetch chat messages with user details for sender and receiver
      const chatMessages = await this.prisma.chat.findMany({
        where: {
          OR: [
            { sender: getChatMessageDto.userId },
            { receiver: getChatMessageDto.userId },
          ],
        },
        include: {
          senderUser: {
            select: {
              userId: true,
              user_name: true,
              profile_img: true,
              profession: true,
            },
          },
          receiverUser: {
            select: {
              userId: true,
              user_name: true,
              profile_img: true,
              profession: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: skip,
        take: limit,
      });

      if (!chatMessages || chatMessages.length === 0) {
        return {
          status: 200,
          message: "no messages found",
          data: [],
        };
      }

      // Filter out the current user's details from the sender/receiver
      const filteredMessages = chatMessages.map((chat) => {
        const otherUser =
          chat.sender === getChatMessageDto.userId
            ? chat.receiverUser
            : chat.senderUser;
        return {
          ...chat,
          otherUser, // Include details of the other participant
        };
      });

      return {
        status: 200,
        message: "success",
        data: filteredMessages,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
  async getMessages(getChatMessageDto: GetChatMessageDto) {
    try {
      const chatMessage = await this.prisma.chat.findUnique({
        where: {
          id: getChatMessageDto.id,
        },
        select: {
          content: true,
        },
      });

      if (!chatMessage) {
        throw new NotFoundException("Chat not found");
      }

      return {
        status: 200,
        message: "success",
        data: chatMessage.content, // Return the content directly
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
  async sendMessage(sendChatMessageDto: SendChatMessageDto) {
    try {
      const { id, user_id, text, url, image } = sendChatMessageDto;

      // Dynamically build the content object
      const contentToPush: any = { user_id };

      if (text) {
        contentToPush.text = text;
      }
      if (url) {
        contentToPush.url = url;
      }
      if (image) {
        contentToPush.image = image;
      }

      // Perform the update operation
      const data = await this.prisma.chat.update({
        where: { id: id },
        data: {
          content: {
            push: contentToPush,
          },
        },
      });

      if (!data) {
        throw new InternalServerErrorException(
          "Failed to update chat message.",
        );
      }

      return {
        status: 200,
        message: "Message sent successfully",
        data,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
