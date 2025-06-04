import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "./menu.schema";

@Controller("menu")
export class MenuControll {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("keyword") keyword?: string) {
    return await this.menuService.findAll();
  }

  @Get("tree")
  async findTree() {
    return await this.menuService.findTree();
  }

  @Post()
  async create(@Body() data: any) {
    console.log("拿到了", data);

    if (data.id) {
      return await this.menuService.update(data.id, data);
    } else {
      return await this.menuService.create(data);
    }
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: Menu) {
    return await this.menuService.update(id, data);
  }

  @Delete()
  async remove(@Body() data: { ids: string[] }) {
    return await this.menuService.removeMany(data.ids);
  }
}
