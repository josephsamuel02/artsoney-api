import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Put,
  Get,
  Delete,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { ArtworkService } from "./artwork.service";
import { PostArtworkDto } from "src/dtos/postArtwork.dto";
import { UpdateArtwork } from "src/dtos/updateArtwork.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("artwork")
@Controller("artwork")
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Get("art_of_the_week")
  public async getArtOfTheWeek(): Promise<any> {
    return await this.artworkService.getArtOfTheWeek();
  }

  @Get("artwork_interests")
  public async getArtworksByUserInterests(userId: any): Promise<any> {
    return await this.artworkService.getArtworksByUserInterests(userId);
  }

  @Get("search")
  public async searchArtworks(searchString: string): Promise<any> {
    return await this.artworkService.searchArtworks(searchString);
  }

  @Get("user_following_artwork")
  public async getArtworksFromFollowedUsers(userId: string): Promise<any> {
    return await this.artworkService.getArtworksFromFollowedUsers(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async uploadArtwork(
    @Body() postArtworkDto: PostArtworkDto,
  ): Promise<any> {
    return await this.artworkService.uploadArtwork(postArtworkDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("update")
  public async updateArtwork(
    @Body() updateArtwork: UpdateArtwork,
  ): Promise<any> {
    return await this.artworkService.updateArtwork(updateArtwork);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("comment")
  public async updateComments(
    @Body() updateArtwork: UpdateArtwork,
  ): Promise<any> {
    return await this.artworkService.updateComments(updateArtwork);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("view")
  public async updateViews(@Body() updateArtwork: UpdateArtwork): Promise<any> {
    return await this.artworkService.updateViews(updateArtwork);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("like")
  public async updateLikes(@Body() updateArtwork: UpdateArtwork): Promise<any> {
    return await this.artworkService.updateLikes(updateArtwork);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete("delete")
  public async deleteArtwork(
    @Body() updateArtwork: UpdateArtwork,
  ): Promise<any> {
    return await this.artworkService.deleteArtwork(updateArtwork);
  }
}
