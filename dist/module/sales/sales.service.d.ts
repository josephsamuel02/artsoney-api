import { SalesDto } from "src/dtos/sales.dto";
export declare class SalesService {
    create(salesDto: SalesDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, salesDto: SalesDto): string;
    remove(id: number): string;
}
