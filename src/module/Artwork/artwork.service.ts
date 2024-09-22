import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PostArtworkDto } from "src/dtos/postArtwork.dto";
import { UpdateArtwork } from "src/dtos/updateArtwork.dto";

@Injectable()
export class ArtworkService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger("createUser");

  async test(data: any) {
    this.logger.log("test");
    // const createUser = await this.prisma.prismaClient.user.findFirst(data);
    return data;
  }

  public async getArts(): Promise<any> {
    try {
      const getArts = await this.prisma.artwork.findMany({
        take: 25,
        include: {
          user: {
            select: {
              user_name: true,
              profile_img: true,
            },
          },
        },
      });

      if (getArts.length === 0) {
        return {
          data: [],
          message: "No artworks",
        };
      }

      return {
        status: 200,
        message: "Artworks fetched successfully",
        data: getArts,
      };
    } catch (error) {
      console.error("Error fetching Artworks  ", error); // Log the error for debugging

      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getMyArtworks(userId: string): Promise<any> {
    try {
      const artworks = await this.prisma.artwork.findMany({
        where: {
          userId: userId,
        },
      });

      return {
        status: 200,
        message: "Your artworks fetched successfully",
        data: artworks,
      };
    } catch (error) {
      console.error("Error fetching Artwork:", error); // Log the error for debugging

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

  public async getArtOfTheWeek(): Promise<any> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const ArtOfTheWeek = await this.prisma.artwork.findMany({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
        orderBy: {
          likes: "desc",
        },
        take: 10,
        include: {
          user: {
            select: {
              user_name: true,
              profile_img: true,
            },
          },
        },
      });

      if (ArtOfTheWeek.length === 0) {
        return {
          data: [],
          message: "No top artworks found in the last 7 days",
        };
      }

      return {
        status: 200,
        message: "Art of the week fetched successfully",
        data: ArtOfTheWeek,
      };
    } catch (error) {
      console.error("Error fetching Art of the Week:", error); // Log the error for debugging

      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getTopArt(): Promise<any> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const ArtOfTheWeek = await this.prisma.artwork.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo, // Get artworks created in the last 30 days
          },
        },
        orderBy: [
          { views: "desc" },
          { likes: "desc" },
          {
            comments: {
              _count: "desc", // Order by the number of comments
            },
          },
        ],
        take: 10, // Limit to 10 artworks, adjust if needed
        include: {
          user: {
            select: {
              user_name: true,
              profile_img: true, // Include user information
            },
          },
        },
      });

      if (!ArtOfTheWeek.length) {
        throw new BadRequestException({
          message: "No top artworks found in the last 30 days",
        });
      }

      return {
        status: 200,
        message: "Top artworks  fetched successfully",
        data: ArtOfTheWeek,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getTrendingArtworks(): Promise<any> {
    try {
      const threeDays = new Date();
      threeDays.setDate(threeDays.getDate() - 3);

      const ArtOfTheWeek = await this.prisma.artwork.findMany({
        where: {
          createdAt: {
            gte: threeDays, // Get artworks created in the last 7 days
          },
        },
        orderBy: {
          likes: "desc", // Order by likes in descending order
        },
        take: 10, // Limit to 10 artworks
        include: {
          user: {
            select: {
              user_name: true,
              profile_img: true, // Include user information
            },
          },
        },
      });

      if (!ArtOfTheWeek.length) {
        return {
          data: [],
          message: "No top artworks found in the last 7 days",
        };
      }

      return {
        status: 200,
        message: "Art of the week fetched successfully",
        data: ArtOfTheWeek,
      };
    } catch (error) {
      console.error("Error fetching Art of the Week:", error); // Log the error for debugging

      throw new BadRequestException({
        error: error.message,
      });
    }
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

  public async getArtworkByNewbies(): Promise<any> {
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

      // For each user, fetch one artwork and include user details (user_name, profile_img)
      const artworks = await Promise.all(
        usersWithArtworks.map(async (user) => {
          return this.prisma.artwork.findFirst({
            where: {
              userId: user.userId,
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

      const selectedArtworks = artworks.filter(Boolean); // Return only artworks (excluding nulls if any user has no artwork)
      if (!selectedArtworks.length) {
        throw new BadRequestException({
          message: "No artworks found in the last 30 days",
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

  public async getArtworksByUserInterests(userId: string): Promise<any> {
    try {
      // Fetch the user by userId and retrieve their interests
      const user = await this.prisma.user.findUnique({
        where: { userId },
        select: { interests: true }, // Only fetch the user's interests
      });

      if (!user || !user.interests.length) {
        // Return artworks ordered by creation date if no interests found
        const allArtworks = await this.prisma.artwork.findMany({
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
          message: "All artworks fetched successfully",
          data: allArtworks,
        };
      }

      // Fetch artworks that match the user's interests
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
        message: "Artworks fetched successfully",
        data: artworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getArtworksByArtField(artField: any): Promise<any> {
    try {
      const artworks = await this.prisma.artwork.findMany({
        where: {
          art_field: {
            has: artField.art_field,
          },
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
        message: "artworks fetched successfully",
        data: artworks,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getAllArtworksFromFollowedUsers(
    currentUserId: string,
  ): Promise<any> {
    try {
      // Get the list of followed userIds
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

      // Fetch artworks from followed users, including user information
      const artworks = await this.prisma.artwork.findMany({
        where: {
          userId: { in: followedUserIds }, // Match artworks by followed user IDs
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

  public async getOneArtworksFromFollowedUsers(
    currentUserId: string,
  ): Promise<any> {
    try {
      // Get the list of followed userIds
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

      // Fetch the most recent artwork from each followed user
      const artworks = await Promise.all(
        followedUserIds.map(async (followedUserId) => {
          const userArtworks = await this.prisma.artwork.findFirst({
            where: {
              userId: followedUserId,
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

      // Filter out any null values (in case any followed user has no artwork)
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

  public async searchArtworks(data: any): Promise<any> {
    try {
      // const { search_string } = data;
      this.logger.log(data.data);
      // Check if search_string is provided
      if (!data.search_string || typeof data.search_string !== "string") {
        return {
          status: 400,
          message: "Invalid search string",
        };
      }

      // Fetch artworks that match the search string in artwork_name or tags
      const artworks = await this.prisma.artwork.findMany({
        where: {
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

  public async uploadArtwork(postArtworkDto: PostArtworkDto): Promise<any> {
    try {
      // Create user information
      const artworkData = {
        artwork_id: `${Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)}`,
        ...postArtworkDto,
      };
      const newArtwork = await this.prisma.artwork.create({
        data: artworkData,
      });
      if (!newArtwork) {
        throw new BadRequestException({
          message: "Unable to upload artwork",
        });
      }

      return {
        status: 200,
        message: "Artwork updated successfully",
        artwork_name: newArtwork.artwork_name,
        artwork_id: newArtwork.artwork_id,
        user: newArtwork.userId,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async updateArtwork(updateArtwork: UpdateArtwork): Promise<any> {
    try {
      const newArtwork = await this.prisma.artwork.update({
        where: { artwork_id: updateArtwork.artwork_id },
        data: updateArtwork,
      });

      if (!newArtwork) {
        throw new BadRequestException({
          message: "Unable to upload artwork",
        });
      }

      return {
        status: 200,
        message: "Artwork updated successfully",
        artwork_name: newArtwork.artwork_name,
        artwork_id: newArtwork.artwork_id,
        user: newArtwork.userId,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  //update views
  public async updateViews(updateArtwork: UpdateArtwork): Promise<any> {
    try {
      const artwork = await this.prisma.artwork.findUnique({
        where: { artwork_id: updateArtwork.artwork_id },
      });

      const updateViews = await this.prisma.artwork.update({
        where: {
          artwork_id: updateArtwork.artwork_id, // Specify the document to update
        },
        data: {
          views: artwork.views + 1,
        },
      });

      if (!updateViews) {
        throw new BadRequestException({
          message: "Unable to like artwork",
        });
      }

      return {
        status: 200,
        message: "Artwork viewed",
        artwork_id: artwork.artwork_id,
        user: updateArtwork.userId,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  // update  likes
  public async updateLikes(updateArtwork: UpdateArtwork): Promise<any> {
    try {
      const artwork = await this.prisma.artwork.findUnique({
        where: { artwork_id: updateArtwork.artwork_id },
      });

      const updateLikes = await this.prisma.artwork.update({
        where: {
          artwork_id: updateArtwork.artwork_id, // Specify the document to update
        },
        data: {
          likes: artwork.likes + updateArtwork.likes,
        },
      });

      if (!updateLikes) {
        throw new BadRequestException({
          message: "Unable to like artwork",
        });
      }

      return {
        status: 200,
        message: "Artwork liked",
        artwork_id: artwork.artwork_id,
        user: updateArtwork.userId,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  //update comments
  public async updateComments(updateArtwork: UpdateArtwork): Promise<any> {
    try {
      const artwork = await this.prisma.artwork.findUnique({
        where: { artwork_id: updateArtwork.artwork_id },
      });

      const updateComments = await this.prisma.artwork.update({
        where: { artwork_id: updateArtwork.artwork_id },

        data: {
          comments: {
            push: {
              userId: updateArtwork.userId,
              user_name: updateArtwork.user_name,
              comment: updateArtwork.comment,
              likes: updateArtwork.likes,
              profile_img: updateArtwork.profile_img,
            },
          },
        },
      });

      if (!updateComments) {
        throw new BadRequestException({
          message: "Unable to comment on artwork",
        });
      }

      return {
        status: 200,
        message: "Commented on Artwork successfully",
        artwork_id: artwork.artwork_id,
        user: updateArtwork.userId,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  // delete
  public async deleteArtwork(updateArtwork: UpdateArtwork): Promise<any> {
    try {
      const artwork = await this.prisma.artwork.findUnique({
        where: { artwork_id: updateArtwork.artwork_id },
      });

      if (!artwork || artwork.userId !== updateArtwork.userId) {
        throw new UnauthorizedException({
          message: "You are not authorized to delete this artwork",
        });
      }

      await this.prisma.artwork.delete({
        where: { artwork_id: updateArtwork.artwork_id },
      });

      return {
        status: 200,
        message: "Artwork deleted successfully",
        artwork_id: updateArtwork.artwork_id,
        user: updateArtwork.userId,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
