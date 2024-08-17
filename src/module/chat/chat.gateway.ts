import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { ChatService } from "./chat.service";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { GetChatMessageDto } from "src/dtos/chatMessage.dto";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway implements NestGateway {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  afterInit(server: any) {
    console.log("WebSocket server initialized", server);
  }

  @UseGuards(JwtAuthGuard)
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Extract sender and receiver from query parameters and construct a ChatMessageDto
    const sender = client.handshake.query.sender as string;
    const receiver = client.handshake.query.receiver as string;

    if (sender && receiver) {
      const chatMessageDto = {
        sender,
        receiver,
      };

      try {
        const chatMessages = await this.chatService.getMessages(chatMessageDto);
        client.emit("chatHistory", chatMessages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        client.emit("error", "Failed to retrieve chat history");
      }
    } else {
      client.emit("error", "Sender and receiver IDs are required");
    }
  }

  @UseGuards(JwtAuthGuard)
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("chat")
  async handleNewMessage(
    @MessageBody() getChatMessageDto: GetChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message = await this.chatService.sendMessage(getChatMessageDto);
      client.emit("newMessage", message);
      client.broadcast.emit("newMessage", message);
    } catch (error) {
      console.error("Error handling new chat message:", error);
      client.emit("error", "Failed to send message");
    }
  }
}
