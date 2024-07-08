import { Module } from "@nestjs/common";
import { AuthModule } from "./module/auth/auth.module";
import { UserModule } from "./module/user/user.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
