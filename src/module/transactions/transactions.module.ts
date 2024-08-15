import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { EncryptionService } from "src/shared";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { MongoDBService } from "src/mongodb/mongodb.service";

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
  exports: [TransactionsService],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    PrismaService,
    MongoDBService,
    EncryptionService,
  ],
})
export class TransactionsModule {}
