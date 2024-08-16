import { SalesService } from "./sales.service";
import { SalesDto } from "src/dtos/sales.dto";
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    getSalesByUserId(userId: string): Promise<any>;
    updateSales(salesDto: SalesDto): Promise<any>;
}
