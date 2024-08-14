import { CartService } from "./cart.service";
import { CartDto } from "src/dtos/cart.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCartItems(cartDto: CartDto): Promise<any>;
    updateCart(cartDto: CartDto): Promise<any>;
    updateCartItem(cartDto: CartDto): Promise<any>;
    deleteCartItem(cartDto: CartDto): Promise<any>;
}
