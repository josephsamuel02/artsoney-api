import { Injectable } from "@nestjs/common";
import { SalesDto } from "src/dtos/sales.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<any> {
    return this.prisma.sales.findUnique({
      where: { userId },
    });
  }

  async updateSales(salesDto: SalesDto): Promise<any> {
    return this.prisma.sales.update({
      where: { userId: salesDto.userId },
      data: salesDto,
    });
  }
}
