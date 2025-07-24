import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { Menu } from "./menu.schema";

@Controller("menu")
export class MenuControll {
  constructor(private readonly menuService: MenuService) {}
  @Post("create")
  async create(@Body() data: Menu & { id?: string }) {
    const id: any = data.id;
    if (id) {
      return await this.menuService.update(id, data);
    } else {
      return await this.menuService.create(data);
    }
  }

  @Get("info")
  async info(@Query("id") id: string) {
    return await this.menuService.findById(id);
  }

  @Get()
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("keyword") keyword?: string) {
    return await this.menuService.findAll();
  }

  @Get("tree")
  async findTree() {
    return await this.menuService.findTree();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.menuService.findById(id);
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
