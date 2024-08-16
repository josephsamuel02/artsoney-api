import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SalesDto } from "src/dtos/sales.dto";
import { PrismaService } from "src/prisma/prisma.service";

@ApiTags("sales")
@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: any): Promise<any> {
    const sales = await this.prisma.sales.findFirst({
      where: { userId },
    });

    if (!sales) {
      throw new NotFoundException("sales not found");
    }
    return {
      status: 200,
      message: " success",
      data: sales,
    };
  }

  async updateSales(salesDto: SalesDto): Promise<any> {
    if (Object.keys(salesDto).length === 0) {
      return new BadRequestException("Bad request");
    }

    const sales = await this.prisma.sales.update({
      where: { userId: salesDto.userId },
      data: salesDto,
    });

    if (!sales) {
      return new NotFoundException("sales not updated");
    }
    return {
      status: 200,
      message: "sales updated successfully",
      data: sales,
    };
  }
}
