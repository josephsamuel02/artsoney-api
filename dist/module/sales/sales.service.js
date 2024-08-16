"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../prisma/prisma.service");
let SalesService = class SalesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        const sales = await this.prisma.sales.findFirst({
            where: { userId },
        });
        if (!sales) {
            throw new common_1.NotFoundException("sales not found");
        }
        return {
            status: 200,
            message: " success",
            data: sales,
        };
    }
    async updateSales(salesDto) {
        if (Object.keys(salesDto).length === 0) {
            return new common_1.BadRequestException("Bad request");
        }
        const sales = await this.prisma.sales.update({
            where: { userId: salesDto.userId },
            data: salesDto,
        });
        if (!sales) {
            return new common_1.NotFoundException("sales not updated");
        }
        return {
            status: 200,
            message: "sales updated successfully",
            data: sales,
        };
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, swagger_1.ApiTags)("sales"),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesService);
//# sourceMappingURL=sales.service.js.map