import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("test")
  @HttpCode(202) // 或者使用 @HttpCode(201)
  getTest(): any {
    return { name: 123, address: "12313" };
  }
}
