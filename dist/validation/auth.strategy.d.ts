import { AuthService } from "src/module/auth/auth.service";
declare const AuthStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class AuthStrategy extends AuthStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<any>;
}
export {};
