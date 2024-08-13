import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ArtworkService } from "./artwork.service";
import { ArtworkController } from "./artwork.controller";
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
        expiresIn: process.env.JWT_EXPR_TIME,
      },
    }),
  ],
  exports: [ArtworkService],
  controllers: [ArtworkController],
  providers: [ArtworkService, PrismaService, EncryptionService],
})
export class ArtworkModule {}
