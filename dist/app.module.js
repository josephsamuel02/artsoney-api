"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./module/auth/auth.module");
const user_module_1 = require("./module/user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const artwork_module_1 = require("./module/Artwork/artwork.module");
const cart_module_1 = require("./module/cart/cart.module");
const order_module_1 = require("./module/order/order.module");
const sales_module_1 = require("./module/sales/sales.module");
const transactions_module_1 = require("./module/transactions/transactions.module");
const mongodb_module_1 = require("./mongodb/mongodb.module");
const reviews_module_1 = require("./module/reviews/reviews.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            mongodb_module_1.MongoDBModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            artwork_module_1.ArtworkModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            sales_module_1.SalesModule,
            transactions_module_1.TransactionsModule,
            reviews_module_1.ReviewsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map