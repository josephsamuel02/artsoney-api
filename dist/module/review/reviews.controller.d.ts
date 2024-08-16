import { ReviewsDto } from "src/dtos/reviews.dto";
import { ReviewsService } from "./reviews.service";
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    createReview(reviewsDto: ReviewsDto): Promise<import("@nestjs/common").BadRequestException | {
        status: number;
        message: string;
        data: {
            id: string;
            userId: string;
            product_id: string;
            storeId: string | null;
            profile_image: string | null;
            product_image: string[];
            rating: number | null;
            review: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findProductReviewsById(reviewsDto: ReviewsDto): Promise<{
        status: number;
        message: string;
        data: {
            id: string;
            userId: string;
            product_id: string;
            storeId: string | null;
            profile_image: string | null;
            product_image: string[];
            rating: number | null;
            review: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findStoreReviewsById(reviewsDto: ReviewsDto): Promise<{
        status: number;
        message: string;
        data: {
            id: string;
            userId: string;
            product_id: string;
            storeId: string | null;
            profile_image: string | null;
            product_image: string[];
            rating: number | null;
            review: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    updateReview(reviewsDto: ReviewsDto): Promise<{
        status: number;
        message: string;
        data: {
            id: string;
            userId: string;
            product_id: string;
            storeId: string | null;
            profile_image: string | null;
            product_image: string[];
            rating: number | null;
            review: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
