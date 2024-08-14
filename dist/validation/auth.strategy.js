"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStrategy = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../module/auth/auth.service");
require("dotenv").config();
let AuthStrategy = class AuthStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRETE_KEY,
        });
        this.authService = authService;
    }
    async validate(payload) {
        if (!payload) {
            throw new common_1.UnauthorizedException({ message: "no payload" });
        }
        const userByUserId = await this.authService.validateUser(payload.userId, payload.password);
        if (!userByUserId) {
            throw new common_1.HttpException("Invalid token", common_1.HttpStatus.UNAUTHORIZED);
        }
        return userByUserId;
    }
};
exports.AuthStrategy = AuthStrategy;
exports.AuthStrategy = AuthStrategy = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthStrategy);
//# sourceMappingURL=auth.strategy.js.map