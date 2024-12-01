import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: "Marius", text: "hello", id: "oo" }];
  clientToUser = {};

  async createMessage(createMessageDto: CreateMessageDto, id: string) {
    const message = {
      id: id,
      name: createMessageDto.name,
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return this.messages;
  }

  async findAll() {
    return this.messages;
  }

  async identify(name: string, id: string) {
    this.clientToUser[id] = name;
    return Object.values(this.clientToUser);
  }
  async getClientByName(id: string) {
    return this.clientToUser[id];
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message ${updateMessageDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
