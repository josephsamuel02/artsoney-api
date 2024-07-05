import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("create")
  // create(@Body() body: CreateAuthDto) {
  //   return this.authService.createUser(body);
  // }
  @Post("test")
  test(@Body() body: CreateAuthDto) {
    return this.authService.test(body);
  }
}
