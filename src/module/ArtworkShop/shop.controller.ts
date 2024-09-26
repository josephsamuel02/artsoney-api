import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ShopService } from "./shop.service";

@ApiTags("artwork_shop")
@Controller("artwork_shop")
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get("shop_artworks")
  public async ShopsArtworks(): Promise<any> {
    return await this.shopService.ShopsArtworks();
  }

  @Get("top_shop_artworks")
  public async TopShopsArtworks(): Promise<any> {
    return await this.shopService.TopShopsArtworks();
  }

  @Get("my_shop_artwork/:userId")
  public async getMyShopArtworks(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.shopService.getMyShopArtworks(userId);
  }

  @Get("newbies_shop_artwork")
  public async getNewbiesShopArtwork(): Promise<any> {
    return await this.shopService.getNewbiesShopArtwork();
  }

  @Get("shop_artwork_for_you/:userId")
  public async getShopArtworksByUserInterests(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.shopService.getShopArtworksByUserInterests(userId);
  }

  @Post("shop_artwork_by_field")
  public async getArtworksByArtField(@Body() artField: any): Promise<any> {
    return await this.shopService.getShopArtworksByArtField(artField);
  }

  @Get("shop_artwork_by_following/:userId")
  public async getAllShopArtworksFromFollowedUsers(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.shopService.getAllShopArtworksFromFollowedUsers(userId);
  }

  @Get("one_shop_artwork_by_following/:userId")
  public async getOneShopArtworkFromFollowedUsers(
    @Param("userId") userId: string,
  ): Promise<any> {
    return await this.shopService.getOneShopArtworkFromFollowedUsers(userId);
  }

  @Post("shop_search")
  public async searchShopArtworks(@Body() data: any): Promise<any> {
    return await this.shopService.searchShopArtworks(data);
  }
}
