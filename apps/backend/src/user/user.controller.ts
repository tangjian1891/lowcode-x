import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @Post("login")
  async login(@Body() body: { username: string; password: string }) {
    const list = await this.userService.find(body);
    if (list.length === 0) {
      return { code: 500, message: "用户名或密码错误" };
    } else {
      return {
        token: await this.userService.getJwtToken(body),
        user: list[0],
      };
    }
  }

  @Post("create")
  create(@Body() data: User) {
    return this.userService.create(data);
  }
}
