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
  Param,
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

  @Get()
  public async getArts(): Promise<any> {
    return await this.artworkService.getArts();
  }

  @Get("get_my_artworks/:userId")
  public async getMyArtworks(@Param("userId") userId: string): Promise<any> {
    return await this.artworkService.getMyArtworks(userId);
  }

  @Get("get_my_shop_artworks/:userId")
  public async getMyShopArtworks(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.artworkService.getMyShopArtworks(userId);
  }

  @Get("art_of_the_week")
  public async getArtOfTheWeek(): Promise<any> {
    return await this.artworkService.getArtOfTheWeek();
  }

  @Get("trending_artwork")
  public async getTrendingArtworks(): Promise<any> {
    return await this.artworkService.getTrendingArtworks();
  }

  @Get("top_art")
  public async getTopArt(): Promise<any> {
    return await this.artworkService.getTopArt();
  }

  @Get("top_shops_artworks")
  public async TopShopsArtworks(): Promise<any> {
    return await this.artworkService.TopShopsArtworks();
  }

  @Get("newbies_artwork")
  public async getArtworkByNewbies(): Promise<any> {
    return await this.artworkService.getArtworkByNewbies();
  }

  @Get("artwork_interests/:userId")
  public async getArtworksByUserInterests(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.artworkService.getArtworksByUserInterests(userId);
  }

  @Post("art_field")
  public async getArtworksByArtField(@Body() artField: any): Promise<any> {
    return await this.artworkService.getArtworksByArtField(artField);
  }

  @Get("artwork_by_following/:userId")
  public async getOneArtworksFromFollowedUsers(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.artworkService.getOneArtworksFromFollowedUsers(userId);
  }

  @Get("all_artworks_by_following/:userId")
  public async getAllArtworksFromFollowedUsers(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.artworkService.getAllArtworksFromFollowedUsers(userId);
  }

  @Post("search")
  public async searchArtworks(@Body() data: any): Promise<any> {
    return await this.artworkService.searchArtworks(data);
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
