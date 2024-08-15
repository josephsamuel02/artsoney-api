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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(orderDto, transactionsRecordDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { userId: orderDto.userId },
            });
            if (!user) {
                return new common_1.BadRequestException({
                    message: "Unable to find user account",
                });
            }
            const createOrder = await this.prisma.order.create({
                data: orderDto,
            });
            if (!createOrder) {
                return new common_1.BadRequestException({
                    message: "Unable to create order",
                });
            }
            for (const product of orderDto.products) {
                const transactionTotalPrice = product.price * product.quantity;
                const seller = await this.prisma.user.findUnique({
                    where: { userId: product.userId },
                });
                if (!seller) {
                    return new common_1.BadRequestException({
                        message: "Unable to find seller info",
                    });
                }
                const createTransactionRec = await this.prisma.transactionsRecord.create({
                    data: {
                        buyer_information: {
                            userId: orderDto.userId,
                            user_name: user.user_name,
                            profile_image: user.profile_img,
                            buyer_account_name: user.user_name,
                        },
                        seller_information: {
                            userId: product.userId,
                            user_name: seller.user_name,
                            profile_image: seller.profile_img,
                            seller_account_name: seller.user_name,
                        },
                        products: {
                            product_id: product.product_id,
                            product_name: product.product_name,
                            product_image: product.product_image[0],
                            product_price: product.price,
                            quantity: product.quantity,
                        },
                        transaction_total_price: transactionTotalPrice,
                        transaction_status: "PENDING",
                        transaction_type: "PAYMENT",
                        transaction_image: transactionsRecordDto?.transaction_image || null,
                        remark: "New order transaction",
                    },
                });
                if (!createTransactionRec) {
                    return new common_1.BadRequestException({
                        message: "Unable to create transaction record",
                    });
                }
                const sellerSales = await this.prisma.sales.findUnique({
                    where: { userId: product.userId },
                });
                const sellerNewBalance = sellerSales.wallet.available_balance + transactionTotalPrice;
                if (sellerSales) {
                    await this.prisma.sales.update({
                        where: { userId: product.userId },
                        data: {
                            total_revenue: {
                                increment: transactionTotalPrice,
                            },
                            wallet: {
                                available_balance: sellerNewBalance,
                            },
                            sales: {
                                increment: product.quantity,
                            },
                        },
                    });
                }
                const buyerSales = await this.prisma.sales.findUnique({
                    where: { userId: orderDto.userId },
                });
                const buyerNewBalance = buyerSales.wallet.available_balance - transactionTotalPrice;
                if (buyerSales) {
                    await this.prisma.sales.update({
                        where: { userId: product.userId },
                        data: {
                            wallet: {
                                available_balance: buyerNewBalance,
                            },
                        },
                    });
                }
            }
            return {
                status: 200,
                message: "Products added to your order successfully",
                data: createOrder,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async updateOrder(orderDto) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { order_id: orderDto.order_id },
            });
            if (!order) {
                return new common_1.NotFoundException({
                    message: "Unable to find order",
                });
            }
            const updateData = {
                ...orderDto,
                ...(orderDto.products
                    ? { products: { set: orderDto.products } }
                    : undefined),
                ...(orderDto.shipping
                    ? { shipping: { ...orderDto.shipping } }
                    : undefined),
                ...(orderDto.billing
                    ? { billing: { ...orderDto.billing } }
                    : undefined),
            };
            delete updateData.order_id;
            const updatedOrder = await this.prisma.order.update({
                where: { order_id: orderDto.order_id },
                data: updateData,
            });
            if (!updatedOrder) {
                return new common_1.BadRequestException({
                    message: "Unable to update order",
                });
            }
            return {
                status: 200,
                message: "order updated successfully",
                data: updatedOrder,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error: error.message,
            });
        }
    }
    async getOrderById(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { order_id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException("Order not found");
        }
        return {
            status: 200,
            message: "success",
            data: order,
        };
    }
    async getAllUserOrders(orderDto) {
        const orders = await this.prisma.order.findMany({
            where: { userId: orderDto.userId },
        });
        if (!orders) {
            throw new common_1.NotFoundException("Order not found");
        }
        return {
            status: 200,
            message: "success",
            data: orders,
        };
    }
    async deleteOrder(orderDto) {
        try {
            const isOwner = await this.prisma.order.findUnique({
                where: { order_id: orderDto.order_id },
            });
            if (isOwner.userId !== orderDto.userId) {
                throw new common_1.NotFoundException("You are not authorized");
            }
            const deletedOrder = await this.prisma.order.delete({
                where: { order_id: orderDto.order_id },
            });
            if (!deletedOrder) {
                throw new common_1.InternalServerErrorException("unable to delete");
            }
            return {
                status: 200,
                message: "Order deleted successfully",
                data: deletedOrder,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException("Error deleting order");
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map