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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReview(reviewsDto) {
        const review = await this.prisma.review.create({
            data: reviewsDto,
        });
        if (!review) {
            return new common_1.BadRequestException({
                message: "Unable to create review",
            });
        }
        return {
            status: 200,
            message: "Review created successfully",
            data: review,
        };
    }
    async findProductReviewsById(reviewsDto) {
        const review = await this.prisma.review.findMany({
            where: { product_id: reviewsDto.product_id },
        });
        if (!review) {
            throw new common_1.NotFoundException("Review not found");
        }
        return {
            status: 200,
            message: "success",
            data: review,
        };
    }
    async findStoreReviewsById(reviewsDto) {
        const review = await this.prisma.review.findMany({
            where: { storeId: reviewsDto.storeId },
        });
        if (!review) {
            throw new common_1.NotFoundException("Review not found");
        }
        return {
            status: 200,
            message: "success",
            data: review,
        };
    }
    async updateReview(reviewsDto) {
        const { id, ...others } = reviewsDto;
        delete reviewsDto.userId;
        delete reviewsDto.product_id;
        const review = await this.prisma.review.update({
            where: { id: id },
            data: others,
        });
        if (!review) {
            throw new common_1.NotFoundException("Review not found");
        }
        return {
            status: 200,
            message: "your review has been updated successfully",
            data: review,
        };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map