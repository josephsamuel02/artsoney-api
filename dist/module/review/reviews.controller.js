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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const reviews_dto_1 = require("../../dtos/reviews.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../validation/jwt-auth.guard");
const reviews_service_1 = require("./reviews.service");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async createReview(reviewsDto) {
        return await this.reviewsService.createReview(reviewsDto);
    }
    async findProductReviewsById(reviewsDto) {
        return await this.reviewsService.findProductReviewsById(reviewsDto);
    }
    async findStoreReviewsById(reviewsDto) {
        return await this.reviewsService.findStoreReviewsById(reviewsDto);
    }
    async updateReview(reviewsDto) {
        return await this.reviewsService.updateReview(reviewsDto);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create a review" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Review created successfully." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Unable to create review." }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviews_dto_1.ReviewsDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get reviews by product ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Reviews retrieved successfully." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Reviews not found." }),
    (0, common_1.Get)("artwork"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviews_dto_1.ReviewsDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findProductReviewsById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get reviews by store ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Reviews retrieved successfully." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Reviews not found." }),
    (0, common_1.Get)("store"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviews_dto_1.ReviewsDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findStoreReviewsById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update a review by product ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Review updated successfully." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Review not found." }),
    (0, common_1.Put)("artwork"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviews_dto_1.ReviewsDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "updateReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)("reviews"),
    (0, common_1.Controller)("reviews"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(common_2.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map