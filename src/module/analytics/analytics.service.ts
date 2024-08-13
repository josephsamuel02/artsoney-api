import { Injectable } from "@nestjs/common";
import { CreateAnalyticsDto } from "../../dtos/createAnalytics.dto";
import { UpdateAnalyticsDto } from "src/dtos/updateAnalytics.dto";

@Injectable()
export class AnalyticsService {
  create(createAnalyticsDto: CreateAnalyticsDto) {
    return `This action adds a new analytics ${createAnalyticsDto}`;
  }

  findAll() {
    return `This action returns all analytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics ${updateAnalyticsDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
