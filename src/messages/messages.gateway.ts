import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagesService } from "./messages.service";
import { Server } from "socket.io";

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  // afterInit(server: any) {
  //   console.log("WebSocket server initialized", server);
  // }

  // async handleConnection(@ConnectedSocket() client: Socket) {
  //   console.log(`Client connected: ${client.id}`);

  //   // Extract sender and receiver from query parameters and construct a ChatMessageDto
  //   const sender = client.handshake.query.sender as string;
  //   const receiver = client.handshake.query.receiver as string;

  //   if (sender && receiver) {
  //     const chatMessageDto = {
  //       sender,
  //       receiver,
  //     };

  //     try {
  //       const chatMessages = chatMessageDto;
  //       client.emit("chatHistory", chatMessages);
  //     } catch (error) {
  //       console.error("Error fetching chat history:", error);
  //       client.emit("error", "Failed to retrieve chat history");
  //     }
  //   } else {
  //     client.emit("error", "Sender and receiver IDs are required");
  //   }
  // }

  // handleDisconnect(client: Socket) {
  //   console.log(`Client disconnected: ${client.id}`);
  // }

  // @SubscribeMessage("create")
  // async crete(
  //   @MessageBody() createMessageDto: CreateMessageDto,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   try {
  //     const message = await this.messagesService.createMessage(
  //       createMessageDto,
  //       client.id,
  //     );
  //     client.broadcast.emit("message", message);

  //     return message;
  //   } catch (error) {
  //     console.error("Error handling new chat message:", error);
  //   }
  // }

  // @SubscribeMessage("findAll")
  // async findAll() {
  //   try {
  //     return this.messagesService.findAll();
  //   } catch (error) {
  //     console.error("Error handling new chat message:", error);
  //   }
  // }

  // @SubscribeMessage("join")
  // async join(
  //   @MessageBody("name") name: string,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   try {
  //     return this.messagesService.identify(name, client.id);
  //   } catch (error) {
  //     console.error("Error handling new chat message:", error);
  //     client.emit("error", "Failed to send message");
  //   }
  // }

  // @SubscribeMessage("typing")
  // async typing(
  //   @MessageBody("isTyping") isTyping: boolean,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const name = await this.messagesService.getClientByName(client.id);
  //   //responds to only connected user except us
  //   client.broadcast.emit("typing", { name, isTyping });
  //   return name;
  // }

  // @SubscribeMessage("findOneMessage")
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage("removeMessage")
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }
}
