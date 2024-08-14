import { CreateAnalyticsDto } from "../../dtos/createAnalytics.dto";
import { UpdateAnalyticsDto } from "src/dtos/updateAnalytics.dto";
export declare class AnalyticsService {
    create(createAnalyticsDto: CreateAnalyticsDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnalyticsDto: UpdateAnalyticsDto): string;
    remove(id: number): string;
}
