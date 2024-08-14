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
    async createOrder(orderDto) {
        try {
            const createOrder = await this.prisma.order.create({
                data: orderDto,
            });
            if (!createOrder) {
                return new common_1.BadRequestException({
                    message: "Unable to create order",
                });
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