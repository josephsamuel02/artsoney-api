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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCartItems(cartDto) {
        try {
            const cartExist = await this.prisma.cart.findUnique({
                where: {
                    userId: cartDto.userId,
                },
            });
            if (!cartExist) {
                const createCart = await this.prisma.cart.create({
                    data: { userId: cartDto.userId },
                });
                if (!createCart) {
                    return new common_1.BadRequestException({
                        message: "Unable to create cart",
                    });
                }
            }
            return {
                status: 200,
                message: "success",
                data: cartExist,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async addToCart(cartDto) {
        try {
            const cartExist = await this.prisma.cart.findFirst({
                where: {
                    userId: cartDto.userId,
                },
            });
            if (!cartExist) {
                throw new common_1.NotFoundException({
                    message: "Unable find user's cart",
                });
            }
            const productExists = cartExist.products.some((product) => product.product_id === cartDto.product_id);
            if (productExists) {
                throw new common_1.BadRequestException({
                    message: "Product already exists in the cart",
                });
            }
            const updatedCart = await this.prisma.cart.update({
                where: {
                    userId: cartDto.userId,
                },
                data: {
                    products: {
                        push: cartDto.product,
                    },
                    total_price: cartExist.total_price +
                        cartDto.product.price * cartDto.product.quantity,
                },
            });
            return {
                status: 200,
                message: "Product added to cart successfully",
                updatedCart,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateCartItem(cartDto) {
        try {
            const cartExist = await this.prisma.cart.findFirst({
                where: {
                    userId: cartDto.userId,
                },
            });
            if (!cartExist) {
                throw new common_1.NotFoundException({
                    message: "Unable find user's cart",
                });
            }
            let newTotalPrice;
            const updatedProductArray = [];
            const updateProduct = cartExist.products.map((product) => {
                if (product.product_id !== cartDto.product.product_id) {
                    updatedProductArray.push(product);
                }
                if (product.product_id === cartDto.product.product_id) {
                    const productTotalPrice = product.price * product.quantity;
                    const totalPrice = cartExist.total_price - productTotalPrice;
                    newTotalPrice = totalPrice + product.price * cartDto.product.quantity;
                    updatedProductArray.push({
                        ...product,
                        quantity: cartDto.product.quantity,
                    });
                    return updatedProductArray;
                }
            });
            if (!updateProduct) {
                throw new common_1.NotFoundException({
                    message: "cart product not found",
                });
            }
            const updatedCart = await this.prisma.cart.update({
                where: {
                    userId: cartDto.userId,
                },
                data: {
                    products: updatedProductArray,
                    total_price: newTotalPrice,
                },
            });
            if (!updatedCart) {
                throw new common_1.ConflictException({
                    message: "cart not updated",
                });
            }
            return {
                status: 200,
                message: "Cart product updated successfully",
                data: { ...updatedCart },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async deleteCartItem(cartDto) {
        try {
            const cartExist = await this.prisma.cart.findUnique({
                where: { userId: cartDto.userId },
            });
            if (!cartExist || cartExist.userId !== cartDto.userId) {
                throw new common_1.UnauthorizedException({
                    message: "You are not authorized to delete this cart",
                });
            }
            const productToDelete = cartExist.products.find((product) => product.product_id === cartDto.product_id);
            if (!productToDelete) {
                throw new common_1.BadRequestException({
                    message: "Product not found in the cart",
                });
            }
            const newTotalPrice = cartExist.total_price -
                productToDelete.price * productToDelete.quantity;
            const updatedProducts = cartExist.products.filter((product) => product.product_id !== cartDto.product_id);
            const updatedCart = await this.prisma.cart.update({
                where: { userId: cartDto.userId },
                data: {
                    products: updatedProducts,
                    total_price: newTotalPrice,
                },
            });
            if (!updatedCart) {
                throw new common_1.BadRequestException({
                    message: "Unable to delete the product from the cart",
                });
            }
            return {
                status: 200,
                message: "Cart item deleted successfully",
                userId: cartDto.userId,
                data: updatedCart,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map