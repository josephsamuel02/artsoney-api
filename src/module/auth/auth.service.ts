import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EncryptionService } from "../../shared";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { LoginUserDto } from "src/dtos/loginUser.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      // Check if user already exists
      const userExist = await this.prisma.auth.findFirst({
        where: {
          email: createUserDto.email,
        },
      });

      if (userExist) {
        throw new BadRequestException({
          message: "User with this email already exists",
        });
      }

      const { user_name, email, password } = createUserDto;

      // Encrypt password
      // const encryptedPass = CryptoJS.AES.encrypt(
      //   password,
      //   process.env.AES_CRYPTION_KEY,
      // ).toString();
      const encryptedPass = await this.encryptionService.hashPassword(password);

      const createAuth = await this.prisma.auth.create({
        data: {
          userId: `${user_name + Math.random().toString(36).slice(2)}`,
          user_name: user_name,
          email: createUserDto.email,
          password: `${encryptedPass}`,
        },
      });

      if (!createAuth) {
        throw new BadRequestException({
          message: "Unable to create user auth account",
        });
      }

      // Create user information
      const userInfo = {
        userId: createAuth.userId,
        email: email,
        user_name: user_name,
      };

      const newUser = await this.prisma.user.create({ data: userInfo });

      if (!newUser) {
        throw new BadRequestException({
          message: "Unable to create user profile",
        });
      }

      // Create user account information
      const userAccount = {
        userId: createAuth.userId,
        email: email,
      };

      const account = await this.prisma.accountSettings.create({
        data: userAccount,
      });

      if (!account) {
        throw new BadRequestException({
          message: "Unable to create user profile",
        });
      }

      // create sales record
      const salesRecord = {
        userId: createAuth.userId,
        total_revenue: 0,
        wallet: {
          available_balance: 0,
          pending_balance: 0,
        },
        sales: 0,
      };

      const sales = await this.prisma.sales.create({
        data: salesRecord,
      });

      if (!sales) {
        throw new BadRequestException({
          message: "Unable to create sales record",
        });
      }

      //  { Do not delete   }
      // Create user and related auth profile
      // const newUser = await this.prisma.user.create({
      //   data: {
      //     email: email,
      //     first_name: first_name,
      //     last_name: last_name,

      //     auth: {
      //       create: {
      //         email: email,
      //         password: encryptedPass,
      //         first_name: createAuthDto.first_name,
      //         last_name: createAuthDto.last_name,
      //       },
      //     },
      //   },
      //   include: {
      //     auth: true,
      //   },
      // });

      return {
        status: 200,
        message: "Artsony account created successfully",
        userId: newUser.userId,
        user: newUser.email,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async seedUsers(data: any[]): Promise<any> {
    try {
      const usersCreated = [];

      // Loop through each user data and create the user record
      for (const userData of data) {
        // // Check if user already exists
        // const userExist = await this.prisma.auth.findFirst({
        //   where: {
        //     email: userData.email,
        //   },
        // });

        // if (userExist) {
        //   throw new BadRequestException({
        //     message: `User with email ${userData.email} already exists`,
        //   });
        // }

        const { userId, user_name, email, password } = userData;

        // Create auth record for the user
        const createAuth = await this.prisma.auth.create({
          data: {
            userId: userId, // Use the userId provided by the user
            user_name: user_name,
            email: email,
            password: password, // Keep the password as is (no encryption)
          },
        });

        if (!createAuth) {
          throw new BadRequestException({
            message: `Unable to create user auth account for ${user_name}`,
          });
        }

        // Create user profile information
        const userInfo = {
          userId: createAuth.userId,
          email: email,
          user_name: user_name,
          phone_number: userData.phone_number,
          first_name: userData.first_name,
          last_name: userData.last_name,
          middle_name: userData.middle_name,
          date_of_birth: userData.date_of_birth,
          address: userData.address,
          profile_img: userData.profile_img,
          profile_poster_img: userData.profile_poster_img,
          about: userData.about,
          art_focus: userData.art_focus,
          bio: userData.bio,
          country: userData.country,
          state: userData.state,
          time_zone: userData.time_zone,
          language: userData.language,
          profession: userData.profession,
          interests: userData.interests,
          hubby: userData.hubby,
          following: userData.following,
          followers: userData.followers,
          likes: userData.likes,
        };

        const newUser = await this.prisma.user.create({ data: userInfo });

        if (!newUser) {
          throw new BadRequestException({
            message: `Unable to create user profile for ${user_name}`,
          });
        }

        // Create user account information (settings)
        const userAccount = {
          userId: createAuth.userId,
          email: email,
        };

        const account = await this.prisma.accountSettings.create({
          data: userAccount,
        });

        if (!account) {
          throw new BadRequestException({
            message: `Unable to create user account settings for ${user_name}`,
          });
        }

        // Create sales record
        const salesRecord = {
          userId: createAuth.userId,
          total_revenue: 0,
          wallet: {
            available_balance: 0,
            pending_balance: 0,
          },
          sales: 0,
        };

        const sales = await this.prisma.sales.create({
          data: salesRecord,
        });

        if (!sales) {
          throw new BadRequestException({
            message: `Unable to create sales record for ${user_name}`,
          });
        }

        usersCreated.push(newUser);
      }

      return {
        status: 200,
        message: `${usersCreated.length} Artsony account(s) created successfully`,
        data: usersCreated,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email } = loginUserDto;
      const userExist = await this.prisma.auth.findUnique({
        where: {
          email: email,
        },
      });

      if (!userExist) {
        throw new NotFoundException(
          `No user found for email: ${loginUserDto.email}`,
        );
      }
      // const encryptedPass = await this.encryptionService.comparePasswords(password);

      const isPasswordValid = this.encryptionService.comparePasswords(
        loginUserDto.password,
        userExist.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException({ message: "invalid credentials" });
      }

      const signedUserToken = this.jwtService.sign({
        userId: userExist.userId,
        password: userExist.password,
      });

      delete userExist.password;

      return {
        access_token: signedUserToken,
        status: 200,
        user: userExist,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async validateUser(userId: any, password: any) {
    try {
      const userExistByUserId = await this.prisma.auth.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!userExistByUserId) {
        throw new UnauthorizedException({ message: "can not find user" });
      } else {
        const decryptedPass = await this.encryptionService.comparePasswords(
          userExistByUserId.password,
          password,
        );

        if (decryptedPass) {
          throw new UnauthorizedException({ message: "invalid credentials" });
        }

        //  delete userExistByUserId.password;
        return userExistByUserId;
      }
    } catch (error) {
      throw new BadRequestException({
        error: error,
        message: "unable to validate user",
      });
    }
  }
}
