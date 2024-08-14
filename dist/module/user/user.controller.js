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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const updateUser_dto_1 = require("../../dtos/updateUser.dto");
const jwt_auth_guard_1 = require("../../validation/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const accountSettings_dto_1 = require("../../dtos/accountSettings.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async getLoggedInUser(req) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new common_1.HttpException("Authorization header missing", common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = authHeader.split(" ")[1];
            if (!token) {
                return new common_1.HttpException("Token missing", common_1.HttpStatus.UNAUTHORIZED);
            }
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRETE_KEY,
            });
            return this.userService.getLogedinUser(decoded);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || "Internal Server Error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getUserById(data) {
        return this.userService.getUserById(data);
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    updateUserById(updateUserDto) {
        return this.userService.updateUserById(updateUserDto);
    }
    getAccountSettings(accountSettingsDto) {
        return this.userService.getAccountSettings(accountSettingsDto);
    }
    updateAccountSettings(accountSettingsDto) {
        return this.userService.updateAccountSettings(accountSettingsDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("my_profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLoggedInUser", null);
__decorate([
    (0, common_1.Get)("user"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)("all_users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)("update_user"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)("account_settings"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accountSettings_dto_1.AccountSettingsDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAccountSettings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)("account_settings"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accountSettings_dto_1.AccountSettingsDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateAccountSettings", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map