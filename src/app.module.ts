import { Module } from "@nestjs/common";
import { AuthModule } from "./module/auth/auth.module";
import { UserModule } from "./module/user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ArtworkModule } from "./module/Artwork/artwork.module";
import { CartModule } from "./module/cart/cart.module";
import { OrderModule } from "./module/order/order.module";
import { SalesModule } from "./module/sales/sales.module";
import { TransactionsModule } from "./module/transactions/transactions.module";
import { MongoDBModule } from "./mongodb/mongodb.module";

@Module({
  imports: [
    PrismaModule,
    MongoDBModule,
    UserModule,
    AuthModule,
    ArtworkModule,
    CartModule,
    OrderModule,
    SalesModule,
    TransactionsModule,
  ],
})
export class AppModule {}
