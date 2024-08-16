import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ReviewsDto } from "src/dtos/reviews.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(reviewsDto: ReviewsDto) {
    const review = await this.prisma.review.create({
      data: reviewsDto,
    });

    if (!review) {
      return new BadRequestException({
        message: "Unable to create review",
      });
    }

    return {
      status: 200,
      message: "Review created successfully",
      data: review,
    };
  }

  async findProductReviewsById(reviewsDto: ReviewsDto) {
    const review = await this.prisma.review.findMany({
      where: { product_id: reviewsDto.product_id },
    });
    if (!review) {
      throw new NotFoundException("Review not found");
    }
    return {
      status: 200,
      message: "success",
      data: review,
    };
  }

  async findStoreReviewsById(reviewsDto: ReviewsDto) {
    const review = await this.prisma.review.findMany({
      where: { storeId: reviewsDto.storeId },
    });
    if (!review) {
      throw new NotFoundException("Review not found");
    }
    return {
      status: 200,
      message: "success",
      data: review,
    };
  }

  async updateReview(reviewsDto: ReviewsDto) {
    const { id, ...others } = reviewsDto;
    delete reviewsDto.userId;
    delete reviewsDto.product_id;

    const review = await this.prisma.review.update({
      where: { id: id },
      data: others,
    });
    if (!review) {
      throw new NotFoundException("Review not found");
    }
    return {
      status: 200,
      message: "your review has been updated successfully",
      data: review,
    };
  }
}
