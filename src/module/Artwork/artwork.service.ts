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
