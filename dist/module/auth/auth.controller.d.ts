import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { LoginUserDto } from "src/dtos/loginUser.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(body: CreateUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<any>;
    payment(loginUserDto: LoginUserDto): Promise<any>;
}
