import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "./menu.schema";

@Controller("menu")
export class MenuControll {
  constructor(private readonly menuService: MenuService) {}
  @Post("create")
  async create(@Body() data: Menu) {
    return await this.menuService.create(data);
  }

  @Get("info")
  async info(@Query("id") id: string) {
    return await this.menuService.info(id);
  }

  @Post("remove")
  async remove(@Body() data: { id?: string; ids?: string[] }): Promise<any> {
    const id = data.id ?? data.ids;
    if (!id) {
      throw new Error("Missing id or ids");
    }
    return await this.menuService.remove(id);
  }

  @Get("tree")
  async tree(): Promise<any[]> {
    return await this.menuService.tree();
  }
}
