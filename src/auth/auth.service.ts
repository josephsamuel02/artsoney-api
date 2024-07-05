import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger("User service");

  // async createUser(data: CreateAuthDto) {
  //   this.logger.log("createUser");
  //   const createUser = await this.prisma.prismaClient.user.findFirst(data);
  //   return createUser;
  // }

  async test(data: any) {
    this.logger.log("test");
    // const createUser = await this.prisma.prismaClient.user.findFirst(data);
    return data;
  }
}
