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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../validation/jwt-auth.guard");
const cart_service_1 = require("./cart.service");
const cart_dto_1 = require("../../dtos/cart.dto");
const swagger_1 = require("@nestjs/swagger");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCartItems(cartDto) {
        return await this.cartService.getCartItems(cartDto);
    }
    async updateCart(cartDto) {
        return await this.cartService.addToCart(cartDto);
    }
    async updateCartItem(cartDto) {
        return await this.cartService.updateCartItem(cartDto);
    }
    async deleteCartItem(cartDto) {
        return await this.cartService.deleteCartItem(cartDto);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartItems", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)("add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Put)("update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartItem", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)("cart"),
    (0, common_1.Controller)("cart"),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map