import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  Put,
  Get,
  Param,
  Delete,
} from "@nestjs/common";

import { OrderDto } from "src/dtos/order.dto";
import { OrderService } from "./order.service";

import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateOrder(@Body() orderDto: OrderDto) {
    return this.orderService.updateOrder(orderDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id")
  getOrderById(@Param("id") id: string) {
    return this.orderService.getOrderById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(":id")
  deleteOrder(@Body() orderDto: OrderDto) {
    return this.orderService.deleteOrder(orderDto);
  }
}
