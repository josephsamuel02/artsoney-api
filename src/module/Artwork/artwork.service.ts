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

  public async getArtOfTheWeek(): Promise<any> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const ArtOfTheWeek = await this.prisma.artwork.findMany({
        where: {
          createdAt: {
            gte: sevenDaysAgo, // Get artworks created in the last 7 days
          },
        },
        orderBy: {
          likes: "desc", // Order by likes in descending order
        },
        take: 10, // Limit to 10 artworks, adjust if needed
      });

      if (!ArtOfTheWeek.length) {
        throw new BadRequestException({
          message: "No top artworks found in the last 7 days",
        });
      }

      return {
        status: 200,
        message: "Art of the week fetched successfully",
        data: ArtOfTheWeek,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getArtworksByUserInterests(userId: string): Promise<any> {
    try {
      // Fetch the user's interests
      const user = await this.prisma.user.findUnique({
        where: {
          userId: userId,
        },
        select: {
          interests: true, // We only need the user's interests
        },
      });

      if (!user || !user.interests.length) {
        const Art = await this.prisma.artwork.findMany({
          take: 10, // Limit to 10 artworks, adjust if needed
        });

        return Art;
      }

      // Fetch artworks that have art_fields matching the user's interests
      const artworks = await this.prisma.artwork.findMany({
        where: {
          art_field: {
            hasSome: user.interests, // This checks for any overlapping interests
          },
        },
        orderBy: {
          createdAt: "desc", // You can order by likes or any other field if needed
        },
      });

      if (!artworks.length) {
        return {
          status: 404,
          message: "No artworks found matching user's interests",
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

  public async searchArtworks(searchString: string): Promise<any> {
    try {
      // Fetch artworks that match the search string in artwork_name or tags
      const artworks = await this.prisma.artwork.findMany({
        where: {
          OR: [
            {
              artwork_name: {
                contains: searchString,
                mode: "insensitive", // Case insensitive search
              },
            },
            {
              tags: {
                has: searchString, // Exact match for a tag
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc", // Optionally order by creation date
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

  public async getArtworksFromFollowedUsers(
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
        };
      }

      const followedUserIds = currentUser.following.map(
        (follow) => follow.userId,
      );

      // Fetch artworks from followed users
      const artworks = await this.prisma.artwork.findMany({
        where: {
          userId: { in: followedUserIds }, // Match artworks by followed user IDs
        },
        orderBy: {
          createdAt: "desc", // Order by creation date, newest first
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
