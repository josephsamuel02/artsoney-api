import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { SalesDto } from "src/dtos/sales.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("sales")
@Controller("sales")
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get(":userId")
  async getSalesByUserId(@Param("userId") userId: string): Promise<any> {
    return await this.salesService.findByUserId(userId);
  }

  @Put()
  async updateSales(@Body() salesDto: SalesDto): Promise<any> {
    return await this.salesService.updateSales(salesDto);
  }
}
