import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "./menu.entity";

@Controller("menu")
export class MenuControll {
  constructor(private readonly menuService: MenuService) {}
  @Post("save")
  async save(@Body() menu: Menu) {
    return await this.menuService.save(menu);
  }

  @Post("delete")
  async remove(@Body("ids") ids: string[]) {
    return await this.menuService.remove(ids);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.menuService.findOne(id);
  }

  @Post("tree")
  async findTree() {
    return await this.menuService.findTree();
  }

  @Post("list")
  async findList(@Body() body: any) {
    return this.menuService.findAll(body.pageNum, body.pageSize);
  }
}
