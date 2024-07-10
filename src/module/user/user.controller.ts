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
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("update_user")
  updateUserById(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(updateUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Put("suspend_user")
  // suspendUser(@Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.suspendUser(updateUserDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Delete("delete_account")
  // deleteUser(@Body("id") updateUserDto: UpdateUserDto) {
  //   return this.userService.deleteUser(updateUserDto);
  // }
}
