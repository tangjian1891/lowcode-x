import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FormSchemaService } from "../services/form-schema.service";
import { FormSchema } from "../entities/form-schema.entity";

@Controller("form/schema")
export class FormSchemaController {
  constructor(private readonly formSchemaService: FormSchemaService) {}

  /**
   * 保存表单模板
   */
  @Post("save")
  saveFormSchema(@Body() formSchema: FormSchema) {
    return this.formSchemaService.saveFormSchema(formSchema);
  }

  /**
   * 获取单个表单模板
   */
  @Get(":menuId")
  findOneFormSchema(@Param("menuId") menuId: string) {
    return this.formSchemaService.findOneFormSchema(menuId);
  }

  /**
   * 删除表单模板
   */
  @Post("delete")
  removeFormSchema(@Body("ids") ids: string[]) {
    return this.formSchemaService.removeFormSchema(ids);
  }

  /**
   * 获取表单模板列表（分页）
   */
  @Post("list")
  findListFormSchema(@Body() body: { pageNum: number; pageSize: number }) {
    return this.formSchemaService.findListFormSchema(body.pageNum, body.pageSize);
  }
}
