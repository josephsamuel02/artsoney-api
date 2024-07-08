import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "../user/user.service";
import { AuthStrategy } from "src/validation/auth.strategy";
import { EncryptionService } from "src/shared";

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
        // "2 days"
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AuthStrategy,
    PrismaService,
    EncryptionService,
  ],
})
export class AuthModule {}
