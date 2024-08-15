import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UpdateAnalyticsDto } from "src/dtos/updateAnalytics.dto";
import { ApiTags } from "@nestjs/swagger";
import { SalesDto } from "src/dtos/sales.dto";
import { SalesService } from "./sales.service";

@ApiTags("sales")
@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() salesDto: SalesDto) {
    return this.salesService.create(salesDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticsDto,
  ) {
    return this.salesService.update(+id, updateAnalyticsDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.salesService.remove(+id);
  }
}
