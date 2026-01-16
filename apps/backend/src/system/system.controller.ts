import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { SystemService } from "./system.service";
import { System } from "./system.entity";
@Controller("system")
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Post("save")
  async save(@Body() system: System) {
    return await this.systemService.save(system);
  }

  @Post("delete")
  async remove(@Body("ids") ids: string[]) {
    return await this.systemService.remove(ids);
  }
  @Get(":id")
  findOne(@Query("id") id: string) {
    return this.systemService.findOne(id);
  }

  @Post("page")
  page(@Body() body: any) {
    return this.systemService.findAll(body.pageNum, body.pageSize);
  }
}
