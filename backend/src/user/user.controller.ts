import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @Post("login")
  login(@Body() body: { username: string; password: string }) {
    return this.userService.getJwtToken(body);
  }
}
