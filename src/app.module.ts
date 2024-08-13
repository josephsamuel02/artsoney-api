import { Module } from "@nestjs/common";
import { AuthModule } from "./module/auth/auth.module";
import { UserModule } from "./module/user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ArtworkModule } from "./module/Artwork/artwork.module";
import { CartModule } from "./module/cart/cart.module";
import { OrderModule } from "./module/order/order.module";
import { AnalyticsModule } from "./module/analytics/analytics.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ArtworkModule,
    CartModule,
    OrderModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
