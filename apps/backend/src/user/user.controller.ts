import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import User from "./user.entity";
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  // @Post("login")
  // async login(@Body() body: { username: string; password: string }) {
  //   const list = await this.userService.find(body);
  //   if (list.length === 0) {
  //     return { code: 500, message: "用户名或密码错误" };
  //   } else {
  //     return {
  //       token: await this.userService.getJwtToken(body),
  //       user: list[0],
  //     };
  //   }
  // }

  // @Post("create")
  // create(@Body() data: User) {
  //   return this.userService.create(data);
  // }

  @Post("login")
  async login(@Body() user: User) {
    const u = await this.userService.verifyPassword(user);
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
