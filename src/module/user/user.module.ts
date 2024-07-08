import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRETE_KEY,
      signOptions: {
        expiresIn: "5m",
      },
    }),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
