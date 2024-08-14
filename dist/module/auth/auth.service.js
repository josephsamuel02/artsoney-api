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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const shared_1 = require("../../shared");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService, encryptionService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger("createUser");
    }
    async test(data) {
        this.logger.log("test");
        return data;
    }
    async createUser(createUserDto) {
        try {
            const userExist = await this.prisma.auth.findFirst({
                where: {
                    email: createUserDto.email,
                },
            });
            if (userExist) {
                throw new common_1.BadRequestException({
                    message: "User with this email already exists",
                });
            }
            const { user_name, email, password } = createUserDto;
            const encryptedPass = await this.encryptionService.hashPassword(password);
            const createAuth = await this.prisma.auth.create({
                data: {
                    userId: `${user_name + Math.random().toString(36).slice(2)}`,
                    user_name: user_name,
                    email: createUserDto.email,
                    password: `${encryptedPass}`,
                },
            });
            if (!createAuth) {
                throw new common_1.BadRequestException({
                    message: "Unable to create user auth account",
                });
            }
            const userInfo = {
                userId: createAuth.userId,
                email: email,
                user_name: user_name,
            };
            const newUser = await this.prisma.user.create({ data: userInfo });
            if (!newUser) {
                throw new common_1.BadRequestException({
                    message: "Unable to create user profile",
                });
            }
            const userAccount = {
                userId: createAuth.userId,
                email: email,
            };
            const account = await this.prisma.accountSettings.create({
                data: userAccount,
            });
            if (!account) {
                throw new common_1.BadRequestException({
                    message: "Unable to create user profile",
                });
            }
            return {
                status: 200,
                message: "Artsony account created successfully",
                userId: newUser.userId,
                user: newUser.email,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async login(loginUserDto) {
        try {
            const userExist = await this.prisma.auth.findUnique({
                where: {
                    email: loginUserDto.email,
                },
            });
            if (!userExist) {
                throw new common_1.NotFoundException(`No user found for email: ${loginUserDto.email}`);
            }
            const isPasswordValid = this.encryptionService.comparePasswords(loginUserDto.password, userExist.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException({ message: "invalid credentials" });
            }
            const signedUserToken = this.jwtService.sign({
                userId: userExist.userId,
                password: userExist.password,
            });
            delete userExist.password;
            return {
                access_token: signedUserToken,
                status: 200,
                user: userExist,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async validateUser(userId, password) {
        try {
            const userExistByUserId = await this.prisma.auth.findFirst({
                where: {
                    userId: userId,
                },
            });
            if (!userExistByUserId) {
                throw new common_1.UnauthorizedException({ message: "can not find user" });
            }
            else {
                const decryptedPass = await this.encryptionService.comparePasswords(userExistByUserId.password, password);
                if (decryptedPass) {
                    throw new common_1.UnauthorizedException({ message: "invalid credentials" });
                }
                return userExistByUserId;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error,
                message: "unable to validate user",
            });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        shared_1.EncryptionService])
], AuthService);
//# sourceMappingURL=auth.service.js.map