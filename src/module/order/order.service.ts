import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { OrderDto } from "src/dtos/order.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOrder(orderDto: OrderDto): Promise<any> {
    try {
      const createOrder = await this.prisma.order.create({
        data: orderDto,
      });

      if (!createOrder) {
        return new BadRequestException({
          message: "Unable to create order",
        });
      }

      return {
        status: 200,
        message: "Products added to your order successfully",
        data: createOrder,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async updateOrder(orderDto: OrderDto): Promise<any> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { order_id: orderDto.order_id },
      });

      if (!order) {
        return new NotFoundException({
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

      // const { products, ...others } = updateData;
      delete updateData.order_id;
      const updatedOrder = await this.prisma.order.update({
        where: { order_id: orderDto.order_id },
        data: updateData,
      });

      if (!updatedOrder) {
        return new BadRequestException({
          message: "Unable to update order",
        });
      }

      return {
        status: 200,
        message: "order updated successfully",
        data: updatedOrder,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async getOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return {
      status: 200,
      message: "success",
      data: order,
    };
  }

  async deleteOrder(orderDto: OrderDto) {
    try {
      const isOwner = await this.prisma.order.findUnique({
        where: { order_id: orderDto.order_id },
      });

      if (isOwner.userId !== orderDto.userId) {
        throw new NotFoundException("You are not authorized");
      }

      const deletedOrder = await this.prisma.order.delete({
        where: { order_id: orderDto.order_id },
      });

      if (!deletedOrder) {
        throw new InternalServerErrorException("unable to delete");
      }

      return {
        status: 200,
        message: "Order deleted successfully",
        data: deletedOrder,
      };
    } catch (error) {
      throw new BadRequestException("Error deleting order");
    }
  }
}
