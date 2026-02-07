import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FormService } from "../form.service";
import { FormData } from "../entities/form-data.entity";

@Controller("form/data")
export class FormDataController {
  constructor(private readonly formService: FormService) {}

  /**
   * 保存表单数据
   */
  @Post("save")
  saveFormData(@Body() formData: FormData) {
    return this.formService.saveFormData(formData);
  }

  /**
   * 获取单个表单数据
   */
  @Get(":id")
  findOneFormData(@Param("id") id: string) {
    return this.formService.findOneFormData(id);
  }

  /**
   * 删除表单数据
   */
  @Post("delete")
  removeFormData(@Body("ids") ids: string[]) {
    return this.formService.removeFormData(ids);
  }

  /**
   * 获取表单数据列表（分页）
   */
  @Post("list")
  findListFormData(@Body() body: { formId: string; pageNum: number; pageSize: number }) {
    return this.formService.findListFormData(body.formId, body.pageNum, body.pageSize);
  }

  /**
   * 初始化表单数据
   */
  @Get("init/:menuId")
  initFormData(@Param("menuId") menuId: string) {
    return this.formService.initFormData(menuId);
  }
}
