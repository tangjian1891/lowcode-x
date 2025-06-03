import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { FormService } from "./form.service";

@Controller("forms") // 使用复数形式更符合RESTful规范
export class FormController {
  constructor(private readonly formService: FormService) {}
  // 获取表单列表，支持分页
  @Get()
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10, @Query("keyword") keyword?: string) {
    return await this.formService.findAll(+page, +limit, keyword);
  }

  // 根据ID获取单个表单
  @Get(":id")
  async findById(@Param("id") id: string) {
    try {
      return await this.formService.findById(id);
    } catch (error) {
      return null;
    }
  }

  // 创建表单
  @Post()
  async create(@Body() data: any) {
    if (data.id) {
      return await this.formService.update(data.id, data);
    } else {
      return await this.formService.create(data);
    }
  }
  // 更新表单
  @Put(":id")
  async update(@Param("id") id: string, @Body() data: any) {
    return await this.formService.update(id, data);
  }

  // 删除单个表单
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.formService.remove(id);
  }

  // 批量删除表单
  @Delete()
  async removeMany(@Body() data: { ids: string[] }) {
    return await this.formService.removeMany(data.ids);
  }
}
