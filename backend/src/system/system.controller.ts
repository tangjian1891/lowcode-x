import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { SystemService } from "./system.service";
import { System } from "./system.schema";
@Controller("system")
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Get("listByUserId")
  async listByUserId(@Query("userId") userId: string) {
    return await this.systemService.findAll({ userId });
  }

  @Post("create")
  async save(@Body() data: System) {
    return await this.systemService.create(data);
  }

  @Get("info")
  async info(@Query("id") id: string) {
    return await this.systemService.findById(id);
  }
}
