import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FormService } from "./form.service";

@Controller("form")
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(":id")
  async getDataById(@Param("id") id: string) {
    return await this.formService.getById(id);
    // return this.formService.getDataById();
  }

  @Post("save")
  saveData(@Body() data: any) {
    console.log("获取到数据 了", data);
    return this.formService.save(data);
  }

  @Post("update")
  async updateById(@Body() data: any) {
    return await this.formService.updateById(data);
  }

  // @Post("delete")
  // deleteOne(@Body() data: any) {
  //   return this.formService.deleteOne(data.id);
  // }

  @Post("batchDelete")
  async deleteMany(@Body() data: { ids: string[] }) {
    return await this.formService.deleteMany(data.ids);
  }
}
