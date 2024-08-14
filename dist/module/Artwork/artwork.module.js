"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtworkModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const prisma_service_1 = require("../../prisma/prisma.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const artwork_service_1 = require("./artwork.service");
const artwork_controller_1 = require("./artwork.controller");
const shared_1 = require("../../shared");
let ArtworkModule = class ArtworkModule {
};
exports.ArtworkModule = ArtworkModule;
exports.ArtworkModule = ArtworkModule = __decorate([
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
        exports: [artwork_service_1.ArtworkService],
        controllers: [artwork_controller_1.ArtworkController],
        providers: [artwork_service_1.ArtworkService, prisma_service_1.PrismaService, shared_1.EncryptionService],
    })
], ArtworkModule);
//# sourceMappingURL=artwork.module.js.map