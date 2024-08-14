import { OrderDto } from "src/dtos/order.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class OrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(orderDto: OrderDto): Promise<any>;
    updateOrder(orderDto: OrderDto): Promise<any>;
    getOrderById(orderId: string): Promise<{
        status: number;
        message: string;
        data: {
            order_id: string;
            userId: string;
            total_price: number | null;
            status: import(".prisma/client").$Enums.OrderStatus | null;
            createdAt: Date;
            updatedAt: Date;
            metadata: import(".prisma/client").Prisma.JsonValue | null;
            billing: {
                holders_name: string;
                card_number: string;
                cvv: string;
                exp_d: string;
            };
            shipping: {
                country: string | null;
                state: string | null;
                address: string | null;
            };
            products: {
                userId: string | null;
                storeId: string | null;
                product_id: string | null;
                product_image: string[];
                product_title: string | null;
                price: number | null;
                quantity: number | null;
            }[];
        };
    }>;
    deleteOrder(orderDto: OrderDto): Promise<{
        status: number;
        message: string;
        data: {
            order_id: string;
            userId: string;
            total_price: number | null;
            status: import(".prisma/client").$Enums.OrderStatus | null;
            createdAt: Date;
            updatedAt: Date;
            metadata: import(".prisma/client").Prisma.JsonValue | null;
            billing: {
                holders_name: string;
                card_number: string;
                cvv: string;
                exp_d: string;
            };
            shipping: {
                country: string | null;
                state: string | null;
                address: string | null;
            };
            products: {
                userId: string | null;
                storeId: string | null;
                product_id: string | null;
                product_image: string[];
                product_title: string | null;
                price: number | null;
                quantity: number | null;
            }[];
        };
    }>;
}
