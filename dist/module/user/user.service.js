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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLogedinUser(data) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    userId: data.userId,
                },
            });
            if (!user) {
                return new common_1.NotFoundException("user not found");
            }
            return { status: "success", data: user };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateUserById(updateUserDto) {
        try {
            const account = await this.prisma.accountSettings.findUnique({
                where: {
                    userId: updateUserDto.userId,
                },
            });
            if (!account) {
                throw new common_1.NotFoundException({
                    message: "failed to get account settings",
                    status: "failed",
                });
            }
            const parsedDateOfBirth = updateUserDto.date_of_birth
                ? new Date(updateUserDto.date_of_birth)
                : undefined;
            const updateUser = await this.prisma.user.update({
                where: {
                    userId: updateUserDto.userId,
                },
                data: { ...updateUserDto, date_of_birth: parsedDateOfBirth },
            });
            if (!updateUser) {
                throw new common_1.BadRequestException({
                    message: "failed to update user",
                    status: "failed",
                });
            }
            return { status: "success", data: updateUser };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async getAccountSettings(accountSettingsDto) {
        try {
            const account = await this.prisma.accountSettings.findUnique({
                where: {
                    userId: accountSettingsDto.userId,
                },
            });
            if (!account) {
                throw new common_1.NotFoundException({
                    message: "failed to get account settings",
                    status: "failed",
                });
            }
            return { status: 200, message: "success", data: account };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateAccountSettings(accountSettingsDto) {
        try {
            const account = await this.prisma.accountSettings.findUnique({
                where: {
                    userId: accountSettingsDto.userId,
                },
            });
            if (!account) {
                throw new common_1.NotFoundException({
                    message: "cannot find this account",
                    status: "failed",
                });
            }
            const updatedAccount = await this.prisma.accountSettings.update({
                where: {
                    userId: accountSettingsDto.userId,
                },
                data: accountSettingsDto,
            });
            if (!updatedAccount) {
                throw new common_1.BadRequestException({
                    message: "failed to update account settings",
                    status: "failed",
                });
            }
            return { status: 200, message: "success", data: updatedAccount };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async getUserById(userId) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    userId: userId,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException("user not found");
            }
            return { status: "success", data: user };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async getAllUsers() {
        try {
            const users = await this.prisma.user.findMany();
            if (!users) {
                throw new common_1.NotFoundException("not found");
            }
            return { status: "success", data: users };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map