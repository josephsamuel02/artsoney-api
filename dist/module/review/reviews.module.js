"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const reviews_controller_1 = require("./reviews.controller");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const prisma_module_1 = require("../../prisma/prisma.module");
const prisma_service_1 = require("../../prisma/prisma.service");
const reviews_service_1 = require("./reviews.service");
let ReviewsModule = class ReviewsModule {
};
exports.ReviewsModule = ReviewsModule;
exports.ReviewsModule = ReviewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule.register({
                defaultStrategy: "jwt",
                property: "user",
                session: false,
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRETE_KEY,
                signOptions: {
                    expiresIn: process.env.JWT_EXPR_TIME,
                },
            }),
        ],
        exports: [reviews_service_1.ReviewsService],
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService, prisma_service_1.PrismaService],
    })
], ReviewsModule);
//# sourceMappingURL=reviews.module.js.map