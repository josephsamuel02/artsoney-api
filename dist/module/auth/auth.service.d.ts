import { PrismaService } from "src/prisma/prisma.service";
import { EncryptionService } from "../../shared";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { LoginUserDto } from "src/dtos/loginUser.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    private encryptionService;
    constructor(prisma: PrismaService, jwtService: JwtService, encryptionService: EncryptionService);
    private logger;
    test(data: any): Promise<any>;
    createUser(createUserDto: CreateUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
        status: number;
        user: {
            id: string;
            userId: string;
            email: string;
            user_name: string | null;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    validateUser(userId: any, password: any): Promise<{
        id: string;
        userId: string;
        email: string;
        user_name: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
