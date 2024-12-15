import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server, Socket } from "socket.io";
import {
  CreateChatMessageDto,
  GetChatMessageDto,
  SendChatMessageDto,
} from "src/dtos/chatMessage.dto";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private chatService: ChatService) {}

  // afterInit(server: any) {
  // console.log("WebSocket server initialized", server);
  // }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Extract sender and receiver from query parameters
    const userId = client.handshake.query.userId as string;

    if (userId) {
      try {
        const allChatMessages =
          await this.chatService.getAllMessagesForUser(userId);
        this.server.emit(`${userId}`, allChatMessages);
        // client.emit(`connected`, allChatMessages);
        // return allChatMessages;
      } catch (error) {
        console.error("Error fetching chat history:", error);
        // client.emit(`connected`, {
        //   status: "error",
        //   message: "Failed to retrieve chat history",
        // });
        client.emit(`${userId}`, {
          status: "error",
          message: "Failed to retrieve chat history",
        });
      }
    } else {
      client.emit(`${userId}`, {
        status: "error",
        message: "User  ID is required",
      });
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("create_message")
  async createConversation(
    @MessageBody() createChatMessageDto: CreateChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message =
        await this.chatService.createOrUpdateConversation(createChatMessageDto);

      client.emit(
        `${message.data.id}`,
        "this is the start of your legendary conversation with",
      );
      // return message;
    } catch (error) {
      console.error("Error handling new chat message:", error);
      client.emit("error", "Failed to send message");
    }
  }

  @SubscribeMessage("get_all_user_messages")
  async getAllMessagesForUser(@ConnectedSocket() client: Socket) {
    // Extract sender and receiver from query parameters
    const userId = client.handshake.query.userId as string;
    if (userId) {
      try {
        const allChatMessages =
          await this.chatService.getAllMessagesForUser(userId);
        client.emit("get_all_user_messages", allChatMessages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        client.emit(`${userId}`, {
          status: "error",
          message: "Failed to retrieve chat history",
        });
      }
    } else {
      client.emit("connected", {
        status: "error",
        message: "User  ID is required",
      });
    }
  }

  @SubscribeMessage("get_messages")
  async getMessages(
    @MessageBody() getChatMessageDto: GetChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message = await this.chatService.getMessages(getChatMessageDto);

      client.emit(`${getChatMessageDto.id}`, message);
      // return message;
    } catch (error) {
      console.error("Error handling new chat message:", error);
      client.emit("error", "Failed to send message");
    }
  }

  @SubscribeMessage("send_message")
  async sendMessage(
    @MessageBody() sendChatMessageDto: SendChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message = await this.chatService.sendMessage(sendChatMessageDto);

      // client.broadcast.emit(`${sendChatMessageDto.id}`, message);
      // client.emit(`${sendChatMessageDto.id}`, message);
      this.server.emit(`${sendChatMessageDto.id}`, message);

      // return message;
    } catch (error) {
      console.error("Error handling new chat message:", error);
      client.emit("error", "Failed to send message");
    }
  }
}
