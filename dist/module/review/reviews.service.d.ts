import { BadRequestException } from "@nestjs/common";
import { ReviewsDto } from "src/dtos/reviews.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createReview(reviewsDto: ReviewsDto): Promise<BadRequestException | {
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
