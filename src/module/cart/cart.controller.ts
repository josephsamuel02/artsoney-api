import {
  Controller,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Put,
  Post,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";

import { CartService } from "./cart.service";
import { CartDto } from "src/dtos/cart.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("cart")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("my_cart")
  public async getCartItems(@Body() cartDto: CartDto): Promise<any> {
    return await this.cartService.getCartItems(cartDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("add")
  public async addToCart(@Body() cartDto: CartDto): Promise<any> {
    return await this.cartService.addToCart(cartDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("update")
  public async updateCartItem(@Body() cartDto: CartDto): Promise<any> {
    return await this.cartService.updateCartItem(cartDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("delete")
  public async deleteCartItem(@Body() cartDto: CartDto): Promise<any> {
    return await this.cartService.deleteCartItem(cartDto);
  }
}
