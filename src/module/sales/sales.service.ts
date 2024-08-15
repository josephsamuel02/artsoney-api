import { Injectable } from "@nestjs/common";
import { SalesDto } from "src/dtos/sales.dto";

@Injectable()
export class SalesService {
  create(salesDto: SalesDto) {
    return `This action adds a new analytics ${salesDto}`;
  }

  findAll() {
    return `This action returns all analytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, salesDto: SalesDto) {
    return `This action updates a #${id} analytics ${salesDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
