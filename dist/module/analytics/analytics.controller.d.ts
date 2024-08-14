import { AnalyticsService } from "./analytics.service";
import { CreateAnalyticsDto } from "../../dtos/createAnalytics.dto";
import { UpdateAnalyticsDto } from "src/dtos/updateAnalytics.dto";
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    create(createAnalyticsDto: CreateAnalyticsDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAnalyticsDto: UpdateAnalyticsDto): string;
    remove(id: string): string;
}
