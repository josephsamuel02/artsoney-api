import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { ReviewsService } from "./reviews.service";
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

  exports: [ReviewsService],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, EncryptionService],
})
export class ReviewsModule {}
