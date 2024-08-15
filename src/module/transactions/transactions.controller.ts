import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  Put,
  Get,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { TransactionsRecordDto } from "src/dtos/transactionRecord.dto";
import { TransactionsService } from "./transactions.service";

@ApiTags("transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createTransactions(@Body() transactionsRecordDto: TransactionsRecordDto) {
    return this.transactionsService.createTransactions(transactionsRecordDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("history")
  getAllTransactions(@Body() transactionsRecordDto: TransactionsRecordDto) {
    return this.transactionsService.getAllTransactionsHistory(
      transactionsRecordDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getTransactionById(@Body() transactionsRecordDto: TransactionsRecordDto) {
    return this.transactionsService.getTransactionById(transactionsRecordDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateTransactionsHistory(
    @Body() transactionsRecordDto: TransactionsRecordDto,
  ) {
    return this.transactionsService.updateTransactionsHistory(
      transactionsRecordDto,
    );
  }
}
