import { SalesDto } from "src/dtos/sales.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class SalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: any): Promise<any>;
    updateSales(salesDto: SalesDto): Promise<any>;
}
