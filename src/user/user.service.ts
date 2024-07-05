import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  // create(createUserDto: CreateUserDto) {
  //   return "This action adds a new user";
  // }

  findAll() {
    return `This action returns all user`;
  }
}
