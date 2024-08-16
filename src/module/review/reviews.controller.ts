import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { ReviewsDto } from "src/dtos/reviews.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { ReviewsService } from "./reviews.service";

@ApiTags("reviews")
@Controller("reviews")
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: "Create a review" })
  @ApiResponse({ status: 200, description: "Review created successfully." })
  @ApiResponse({ status: 400, description: "Unable to create review." })
  @Post()
  async createReview(@Body() reviewsDto: ReviewsDto) {
    return await this.reviewsService.createReview(reviewsDto);
  }

  @ApiOperation({ summary: "Get reviews by product ID" })
  @ApiResponse({ status: 200, description: "Reviews retrieved successfully." })
  @ApiResponse({ status: 404, description: "Reviews not found." })
  @Get("artwork")
  async findProductReviewsById(@Body() reviewsDto: ReviewsDto) {
    return await this.reviewsService.findProductReviewsById(reviewsDto);
  }

  @ApiOperation({ summary: "Get reviews by store ID" })
  @ApiResponse({ status: 200, description: "Reviews retrieved successfully." })
  @ApiResponse({ status: 404, description: "Reviews not found." })
  @Get("store")
  async findStoreReviewsById(@Body() reviewsDto: ReviewsDto) {
    return await this.reviewsService.findStoreReviewsById(reviewsDto);
  }

  @ApiOperation({ summary: "Update a review by product ID" })
  @ApiResponse({ status: 200, description: "Review updated successfully." })
  @ApiResponse({ status: 404, description: "Review not found." })
  @Put("artwork")
  async updateReview(@Body() reviewsDto: ReviewsDto) {
    return await this.reviewsService.updateReview(reviewsDto);
  }
}
