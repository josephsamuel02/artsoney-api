import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AccountSettingsDto } from "src/dtos/accountSettings.dto";
import { UpdateUserDto } from "src/dtos/updateUser.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getLogedinUser(data) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userId: data.userId,
        },
      });

      if (!user) {
        return new NotFoundException("user not found");
      }

      return { status: "success", data: user };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async updateUserById(updateUserDto: UpdateUserDto) {
    try {
      const account = await this.prisma.accountSettings.findUnique({
        where: {
          userId: updateUserDto.userId,
        },
      });

      if (!account) {
        throw new NotFoundException({
          message: "failed to get account settings",
          status: "failed",
        });
      }
      const parsedDateOfBirth = updateUserDto.date_of_birth
        ? new Date(updateUserDto.date_of_birth)
        : undefined;

      const updateUser = await this.prisma.user.update({
        where: {
          userId: updateUserDto.userId,
        },
        data: { ...updateUserDto, date_of_birth: parsedDateOfBirth },
      });

      if (!updateUser) {
        throw new BadRequestException({
          message: "failed to update user",
          status: "failed",
        });
      }

      return { status: "success", data: updateUser };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async getAccountSettings(accountSettingsDto: AccountSettingsDto) {
    try {
      const account = await this.prisma.accountSettings.findUnique({
        where: {
          userId: accountSettingsDto.userId,
        },
      });

      if (!account) {
        throw new NotFoundException({
          message: "failed to get account settings",
          status: "failed",
        });
      }

      return { status: 200, message: "success", data: account };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
  async updateAccountSettings(accountSettingsDto: AccountSettingsDto) {
    try {
      const account = await this.prisma.accountSettings.findUnique({
        where: {
          userId: accountSettingsDto.userId,
        },
      });

      if (!account) {
        throw new NotFoundException({
          message: "cannot find this account",
          status: "failed",
        });
      }

      const updatedAccount = await this.prisma.accountSettings.update({
        where: {
          userId: accountSettingsDto.userId,
        },
        data: accountSettingsDto,
      });

      if (!updatedAccount) {
        throw new BadRequestException({
          message: "failed to update account settings",
          status: "failed",
        });
      }

      return { status: 200, message: "success", data: updatedAccount };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!user) {
        throw new NotFoundException("user not found");
      }

      return { status: "success", data: user };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async addFollowUser(updateUserDto: UpdateUserDto) {
    try {
      // Ensure the user exists
      const user = await this.prisma.user.findFirst({
        where: {
          userId: updateUserDto.userId,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      // Check if the user is already in the followers array
      const isAlreadyFollowing = user.followers.some(
        (follower) => follower.user_id === updateUserDto.user_id,
      );

      if (isAlreadyFollowing) {
        return { status: "success", message: "User is already a follower" };
      }

      // Update the followers array
      const updatedUser = await this.prisma.user.update({
        where: { userId: updateUserDto.userId },
        data: {
          followers: {
            push: {
              user_name: updateUserDto.user_name,
              user_id: updateUserDto.user_id,
              profile_img: updateUserDto.profile_img,
            },
          },
        },
      });

      return { status: 200, message: "success", data: updatedUser.userId };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  // Admin Endpoints
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();

      if (!users) {
        throw new NotFoundException("not found");
      }

      return { status: "success", data: users };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
