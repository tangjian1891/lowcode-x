import { Body, Controller, Get, Post } from "@nestjs/common";
import { SystemService } from "./system.service";
import { System } from "./system.schema";
@Controller("system")
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Get("findSystemsByUserId")
  async getSystemsByUserId(userId: string) {
    return await this.systemService.findAll({ userId });
  }

  @Post("create")
  async save(@Body() data: System) {
    return await this.systemService.create(data);
  }
}
