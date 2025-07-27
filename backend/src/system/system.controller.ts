import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { SystemService } from "./system.service";
import { System } from "./system.schema";
@Controller("system")
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Post("create")
  async save(@Body() data: System) {
    return await this.systemService.create(data);
  }

  @Get("info")
  async info(@Query("id") id: string) {
    return await this.systemService.info(id);
  }

  @Post("remove")
  async async(@Body() data: { id?: string; ids?: string[] }): Promise<any> {
    const id = data.id ?? data.ids;
    if (!id) {
      throw new Error("Missing id or ids");
    }
    return await this.systemService.remove(id);
  }

  @Post("page")
  async page(@Query("userId") userId: string, @Body("query") query = {}, @Body("page") page = 1, @Body("pageSize") pageSize = 10) {
    return await this.systemService.page(userId, query, page, pageSize);
  }
}
