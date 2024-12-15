import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CartDto } from "src/dtos/cart.dto";

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // get Cart Items
  public async getCartItems(cartDto: CartDto): Promise<any> {
    try {
      // Check if user already exists
      const cartExist = await this.prisma.cart.findFirst({
        where: {
          userId: cartDto.userId,
        },
      });

      if (!cartExist) {
        const createCart = await this.prisma.cart.create({
          data: { userId: cartDto.userId },
        });

        if (!createCart) {
          return new BadRequestException({
            message: "Unable to create cart",
          });
        }
      }

      return {
        status: 200,
        message: "success",
        data: cartExist,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  // update cart item
  public async addToCart(cartDto: CartDto): Promise<any> {
    try {
      // Check if user already exists
      const cart = await this.prisma.cart.findUnique({
        where: {
          userId: cartDto.userId,
        },
      });

      if (!cart) {
        const newCart = await this.prisma.cart.create({
          data: {
            userId: cartDto.userId,
            storeId: cartDto.userId,
            products: [],
            total_price: 0,
          },
        });

        const updated = await this.prisma.cart.update({
          where: {
            userId: cartDto.userId,
          },
          data: {
            products: {
              push: cartDto.product,
            },
            total_price:
              newCart.total_price +
              cartDto.product.price * cartDto.product.quantity, // Optionally update the total price
          },
        });

        return {
          status: 200,
          message: "Product added to cart successfully",
          data: updated,
        };
      }
      // Check if the product already exists in the cart
      const productExists = cart.products.some(
        (product: any) => product.artwork_id === cartDto.artwork_id,
      );

      if (productExists) {
        return {
          status: 200,
          message: "Product already exists in the cart",
          data: productExists,
        };
      }

      // Add the new product to the cart
      const updatedCart = await this.prisma.cart.update({
        where: {
          userId: cartDto.userId,
        },
        data: {
          products: {
            push: cartDto.product,
          },
          total_price:
            cart.total_price + cartDto.product.price * cartDto.product.quantity, // Optionally update the total price
        },
      });

      return {
        status: 200,
        message: "Product added to cart successfully",
        data: updatedCart,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async updateCartItem(cartDto: CartDto): Promise<any> {
    try {
      // Check if user already exists
      const cartExist = await this.prisma.cart.findFirst({
        where: {
          userId: cartDto.userId,
        },
      });

      if (!cartExist) {
        throw new NotFoundException({
          message: "Unable find user's cart",
        });
      }
      // let quantity = cartDto.product.quantity

      let newTotalPrice: number;
      const updatedProductArray = [];
      // Update the specific product
      const updateProduct = cartExist.products.map((product) => {
        // Check if the product exists in the cart

        if (product.artwork_id !== cartDto.product.artwork_id) {
          updatedProductArray.push(product);
        }

        if (product.artwork_id === cartDto.product.artwork_id) {
          // calculate the new price
          const productTotalPrice = product.price * product.quantity;
          const totalPrice = cartExist.total_price - productTotalPrice;
          newTotalPrice = totalPrice + product.price * cartDto.product.quantity;

          // Update the product details
          updatedProductArray.push({
            ...product,
            quantity: cartDto.product.quantity,
          });
          return updatedProductArray;
        }
      });

      if (!updateProduct) {
        throw new NotFoundException({
          message: "cart product not found",
        });
      }

      // Update the cart with the modified products array
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
        throw new ConflictException({
          message: "cart not updated",
        });
      }
      return {
        status: 200,
        message: "Cart product updated successfully",
        data: updatedCart,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  // delete
  public async deleteCartItem(cartDto: CartDto): Promise<any> {
    try {
      const cartExist = await this.prisma.cart.findUnique({
        where: { userId: cartDto.userId },
      });

      if (!cartExist || cartExist.userId !== cartDto.userId) {
        throw new UnauthorizedException({
          message: "You are not authorized to delete this cart",
        });
      }

      // Find the product to delete
      const productToDelete = cartExist.products.find(
        (product) => product.artwork_id === cartDto.product.artwork_id,
      );

      if (!productToDelete) {
        throw new BadRequestException({
          message: "Product not found in the cart",
        });
      }

      // Calculate the new total price
      const newTotalPrice =
        cartExist.total_price -
        productToDelete.price * productToDelete.quantity;

      // Filter out the product to delete from the products array
      const updatedProducts = cartExist.products.filter(
        (product) => product.artwork_id !== cartDto.product.artwork_id,
      );

      // Update the cart with the new products array and total price
      const updatedCart = await this.prisma.cart.update({
        where: { userId: cartDto.userId },
        data: {
          products: updatedProducts,
          total_price: newTotalPrice,
        },
      });

      if (!updatedCart) {
        throw new BadRequestException({
          message: "Unable to delete the product from the cart",
        });
      }

      return {
        status: 200,
        message: "Cart item deleted successfully",
        userId: cartDto.userId,
        data: updatedCart,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
