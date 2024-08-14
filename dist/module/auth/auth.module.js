"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const auth_strategy_1 = require("../../validation/auth.strategy");
const shared_1 = require("../../shared");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
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
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            auth_strategy_1.AuthStrategy,
            prisma_service_1.PrismaService,
            shared_1.EncryptionService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map