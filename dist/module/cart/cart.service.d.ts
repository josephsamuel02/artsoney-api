import { PrismaService } from "src/prisma/prisma.service";
import { CartDto } from "src/dtos/cart.dto";
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartItems(cartDto: CartDto): Promise<any>;
    addToCart(cartDto: CartDto): Promise<any>;
    updateCartItem(cartDto: CartDto): Promise<any>;
    deleteCartItem(cartDto: CartDto): Promise<any>;
}
