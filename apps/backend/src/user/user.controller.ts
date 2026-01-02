import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import User from "./user.entity";
import { AuthPublic } from "src/common/guards/jwt.auth.guard";
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @AuthPublic()
  @Post("login")
  async login(@Body() user: User) {
    console.log(user);

    const u = await this.userService.verifyPassword(user);

    const token = await this.userService.generateToken(u!);
    return {
      user: u,
      access_token: token,
    };
  }
  @AuthPublic()
  @Post("register")
  async register(@Body() user: User) {
    console.log(user);

    const u = await this.userService.save(user);
    return u;
  }

  @Post("save")
  save(@Body() user: User) {
    return this.userService.save(user);
  }

  @Post("delete")
  remove(@Body("ids") ids: string[]) {
    return this.userService.remove(ids);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Post("list")
  findAll(@Body() body: any) {
    return this.userService.findAll(body.pageNum, body.pageSize);
  }
}
