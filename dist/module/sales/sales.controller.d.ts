import { UpdateAnalyticsDto } from "src/dtos/updateAnalytics.dto";
import { SalesDto } from "src/dtos/sales.dto";
import { SalesService } from "./sales.service";
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(salesDto: SalesDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAnalyticsDto: UpdateAnalyticsDto): string;
    remove(id: string): string;
}
