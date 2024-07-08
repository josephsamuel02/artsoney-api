import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "src/dtos/updateUser.dto";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("user")
  getUserById(@Body() data: string) {
    return this.userService.getUserById(data);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("all_users")
  getAllUsers() {
    // return req.headers["authorization"];

    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("update_user")
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
