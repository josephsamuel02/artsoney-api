import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger("createUser");

  async test(data: any) {
    this.logger.log("test");
    // const createUser = await this.prisma.prismaClient.user.findFirst(data);
    return data;
  }

  public async TopShopsArtworks(): Promise<any> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 20); // Adjusted to 20 days as per your code

    try {
      const TopShopsArtworks = await this.prisma.artwork.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo, // Get artworks created in the last 20 days
          },
          for_sale: true,
        },
        orderBy: [
          { views: "desc" },
          { likes: "desc" },
          {
            comments: {
              _count: "desc",
            },
          },
        ],
        take: 15,
        include: {
          user: {
            select: {
              user_name: true,
              profile_img: true,
            },
          },
        },
      });

      if (!TopShopsArtworks.length) {
        throw new BadRequestException({
          message: "No artworks found in the last 20 days",
        });
      }

      return {
        status: 200,
        message: "Top shops artworks fetched successfully",
        data: TopShopsArtworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getMyShopArtworks(userId: string): Promise<any> {
    try {
      const artworks = await this.prisma.artwork.findMany({
        where: {
          userId: userId,
          for_sale: true,
        },
      });

      return {
        status: 200,
        message: "Shop artworks fetched successfully",
        data: artworks,
      };
    } catch (error) {
      console.error("Error fetching Artwork", error); // Log the error for debugging

      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getNewbiesShopArtwork(): Promise<any> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
      // Fetch users who have artworks and their accounts were created within the last 30 days
      const usersWithArtworks = await this.prisma.user.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo, // Get users created within the last 30 days
          },
        },
        take: 10,
        orderBy: {
          createdAt: "asc",
        },
        select: {
          userId: true, // Fetch only the userId to filter their artworks
        },
      });

      // For each user, fetch one artwork where 'for_sale' is true and include user details (user_name, profile_img)
      const artworks = await Promise.all(
        usersWithArtworks.map(async (user) => {
          return this.prisma.artwork.findFirst({
            where: {
              userId: user.userId,
              for_sale: true, // Filter artworks that are for sale
            },
            orderBy: {
              createdAt: "asc",
            },
            include: {
              user: {
                select: {
                  user_name: true,
                  profile_img: true,
                },
              },
            },
          });
        }),
      );

      const selectedArtworks = artworks.filter(Boolean); // Return only artworks (excluding nulls if any user has no artwork for sale)
      if (!selectedArtworks.length) {
        throw new BadRequestException({
          message: "No artworks for sale found in the last 30 days",
        });
      }

      return {
        status: 200,
        message: "Artworks fetched successfully",
        data: selectedArtworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getShopArtworksByUserInterests(userId: string): Promise<any> {
    try {
      // Fetch the user by userId and retrieve their interests
      const user = await this.prisma.user.findUnique({
        where: { userId },
        select: { interests: true }, // Only fetch the user's interests
      });

      if (!user || !user.interests.length) {
        // Return artworks ordered by creation date if no interests found and are for sale
        const allArtworks = await this.prisma.artwork.findMany({
          where: {
            for_sale: true, // Only fetch artworks that are for sale
          },
          orderBy: {
            createdAt: "asc", // Sort by the `createdAt` field in ascending order
          },
          include: {
            user: {
              select: {
                userId: true,
                user_name: true,
                profile_img: true, // Include user information with the artwork
              },
            },
          },
        });

        return {
          status: 200,
          message: "All artworks for sale fetched successfully",
          data: allArtworks,
        };
      }

      // Fetch artworks that match the user's interests and are for sale
      const artworks = await this.prisma.artwork.findMany({
        where: {
          AND: [
            {
              OR: [
                { tags: { hasSome: user.interests } },
                { art_field: { hasSome: user.interests } },
              ],
            },
            {
              artwork_type: {
                not: null, // Ensure that artwork_type is not null
              },
            },
            {
              for_sale: true, // Only fetch artworks that are for sale
            },
          ],
        },
        include: {
          user: {
            select: {
              userId: true,
              user_name: true,
              profile_img: true, // Include user information with the artwork
            },
          },
        },
        take: 20,
      });

      return {
        status: 200,
        message:
          "Artworks matching user interests and for sale fetched successfully",
        data: artworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getShopArtworksByArtField(artField: any): Promise<any> {
    try {
      const artworks = await this.prisma.artwork.findMany({
        where: {
          art_field: {
            has: artField.art_field,
          },
          for_sale: true, // Only fetch artworks that are for sale
        },
        take: 12,
        include: {
          user: {
            select: {
              user_name: true,
              profile_img: true, // Include user information
            },
          },
        },
      });

      return {
        status: 200,
        message:
          "Artworks for sale in the specified art field fetched successfully",
        data: artworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getAllShopArtworksFromFollowedUsers(
    currentUserId: string,
  ): Promise<any> {
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: { userId: currentUserId },
        select: { following: true }, // Get only the list of followed users
      });

      if (!currentUser || !currentUser.following.length) {
        return {
          status: 404,
          message: "You are not following anyone or no artworks found",
          data: [],
        };
      }

      const followedUserIds = currentUser.following.map(
        (follow) => follow.userId,
      );

      // Fetch artworks that are for sale from followed users
      const artworks = await this.prisma.artwork.findMany({
        where: {
          userId: { in: followedUserIds }, // Match artworks by followed user IDs
          for_sale: true, // Only fetch artworks that are for sale
        },
        orderBy: {
          createdAt: "desc", // Order by creation date, newest first
        },
        include: {
          user: {
            select: {
              userId: true,
              user_name: true,
              profile_img: true, // Include user information with artworks
            },
          },
        },
      });

      if (!artworks.length) {
        return {
          status: 404,
          message: "No artworks found from followed users",
        };
      }

      return {
        status: 200,
        message: "Artworks from followed users fetched successfully",
        data: artworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getOneShopArtworkFromFollowedUsers(
    currentUserId: string,
  ): Promise<any> {
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: { userId: currentUserId },
        select: { following: true }, // Get only the list of followed users
      });

      if (!currentUser || !currentUser.following.length) {
        return {
          status: 404,
          message: "You are not following anyone or no artworks found",
          data: [],
        };
      }

      const followedUserIds = currentUser.following.map(
        (follow) => follow.userId,
      );

      // Fetch the most recent artwork from each followed user that is for sale
      const artworks = await Promise.all(
        followedUserIds.map(async (followedUserId) => {
          const userArtworks = await this.prisma.artwork.findFirst({
            where: {
              userId: followedUserId,
              for_sale: true, // Only fetch artworks that are for sale
            },
            orderBy: {
              createdAt: "desc", // Order by creation date, newest first
            },
            include: {
              user: {
                select: {
                  userId: true,
                  user_name: true,
                  profile_img: true, // Include user information with artworks
                },
              },
            },
          });
          return userArtworks;
        }),
      );

      // Filter out any null values
      const filteredArtworks = artworks.filter((artwork) => artwork !== null);

      if (!filteredArtworks.length) {
        return {
          status: 404,
          message: "No artworks found from followed users",
        };
      }

      return {
        status: 200,
        message: "Artworks from followed users fetched successfully",
        data: filteredArtworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async searchShopArtworks(data: any): Promise<any> {
    try {
      if (!data.search_string || typeof data.search_string !== "string") {
        return {
          status: 400,
          message: "Invalid search string",
        };
      }

      // Fetch artworks that match the search string in artwork_name or tags and are for sale
      const artworks = await this.prisma.artwork.findMany({
        where: {
          for_sale: true, // Only fetch artworks that are for sale
          OR: [
            {
              artwork_name: {
                contains: data.search_string,
                mode: "insensitive", // Case insensitive search
              },
            },
            {
              tags: {
                has: data.search_string, // Exact match for a tag
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc", // Optionally order by creation date
        },
        take: 14,
        include: {
          user: {
            select: {
              userId: true,
              user_name: true,
              profile_img: true, // Include user information with artworks
            },
          },
        },
      });

      if (!artworks.length) {
        return {
          status: 404,
          message: "No artworks found for the given search string",
        };
      }

      return {
        status: 200,
        message: "Artworks fetched successfully",
        data: artworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
