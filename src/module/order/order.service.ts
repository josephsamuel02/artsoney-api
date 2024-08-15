import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { OrderDto } from "src/dtos/order.dto";
import { TransactionsRecordDto } from "src/dtos/transactionRecord.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOrder(
    orderDto: OrderDto,
    transactionsRecordDto?: TransactionsRecordDto,
  ): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userId: orderDto.userId },
      });

      if (!user) {
        return new BadRequestException({
          message: "Unable to find user account",
        });
      }

      const createOrder = await this.prisma.order.create({
        data: orderDto,
      });

      if (!createOrder) {
        return new BadRequestException({
          message: "Unable to create order",
        });
      }

      // create transaction record for each product in the order
      // and update the wallet,total_revenue and sales in the sales record of the product owner

      // map through the product
      // create a transaction template data
      //multiply each product quantity times price to add to each product owner`s wallet
      //

      // Loop through products to create transaction records and update sales
      for (const product of orderDto.products) {
        const transactionTotalPrice = product.price * product.quantity;

        const seller = await this.prisma.user.findUnique({
          where: { userId: product.userId },
        });

        if (!seller) {
          return new BadRequestException({
            message: "Unable to find seller info",
          });
        }
        // Create transaction record
        const createTransactionRec =
          await this.prisma.transactionsRecord.create({
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
              transaction_image:
                transactionsRecordDto?.transaction_image || null,
              remark: "New order transaction",
            },
          });

        if (!createTransactionRec) {
          return new BadRequestException({
            message: "Unable to create transaction record",
          });
        }

        // Update seller   sales record
        const sellerSales = await this.prisma.sales.findUnique({
          where: { userId: product.userId },
        });

        const sellerNewBalance =
          sellerSales.wallet.available_balance + transactionTotalPrice;

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

        // Update seller and buyer sales record

        const buyerSales = await this.prisma.sales.findUnique({
          where: { userId: orderDto.userId },
        });
        const buyerNewBalance =
          buyerSales.wallet.available_balance - transactionTotalPrice;

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

  async getAllUserOrders(orderDto: OrderDto) {
    const orders = await this.prisma.order.findMany({
      where: { userId: orderDto.userId },
    });

    if (!orders) {
      throw new NotFoundException("Order not found");
    }

    return {
      status: 200,
      message: "success",
      data: orders,
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
