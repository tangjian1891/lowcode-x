import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { FormService } from "./form.service";
import { getFormDataModel } from "./dynamic-form-data.util";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Form } from "./form.schema";
import { Connection, Model } from "mongoose";

@Controller("forms") // 使用复数形式更符合RESTful规范
export class FormController {
  constructor(
    private readonly formService: FormService,
    @InjectModel(Form.name) private formModel: Model<Form>,
    @InjectConnection() private connection: Connection,
  ) {}
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
  // 根据ID获取单个表单
  @Get("relateId/:relateId")
  async findByRelateId(@Param("relateId") relateId: string) {
    console.log("可以拿到的吗", relateId);

    try {
      return await this.formService.findByRelateId(relateId);
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

  /**
   * 动态插入业务数据，每个字段直接存储为文档字段
   */
  @Post(":formId/data")
  async insertFormData(@Param("formId") formId: string, @Body() data: any) {
    // 通过relateId查找表单配置
    const form: any = await this.formModel.findOne({ relateId: formId }).lean();
    if (!form) throw new Error("表单配置不存在");

    // 只保留表单配置中有的字段
    const docData = {};
    for (const field of form.fields) {
      if (data[field.id] !== undefined) {
        docData[field.id] = String(data[field.id]);
      }
    }

    // 用表单_id获取动态模型
    const Model = await getFormDataModel(form._id, this.connection, this.formModel);
    const doc = await Model.create(docData);
    return { success: true, id: doc._id };
  }

  /**
   * 查询某个表单的业务数据
   */

  @Get("get/:formId/:id")
  async asyncGetFormData(@Param("formId") formId: string, @Param("id") id: string): Promise<any> {
    // 通过relateId查找表单配置
    const form: any = await this.formModel.findOne({ relateId: formId }).lean();
    if (!form) throw new Error("表单配置不存在");

    // 用表单_id获取动态模型
    const Model = await getFormDataModel(form._id, this.connection, this.formModel);
    const result = await Model.findOne({ _id: id });
    return result;
  }

  /**
   * 删除某个表单的业务数据
   */
  @Delete(":formId/:id")
  async removeFormData(@Param("formId") formId: string, @Param("id") id: string): Promise<any> {
    // 通过relateId查找表单配置
    const form: any = await this.formModel.findOne({ relateId: formId }).lean();
    if (!form) throw new Error("表单配置不存在");

    // 用表单_id获取动态模型
    const Model = await getFormDataModel(form._id, this.connection, this.formModel);
    const result = await Model.deleteOne({ _id: id });
    return result;
  }

  /**
   * 查询某表单的业务数据列表
   */
  @Get(":formId/data")
  async getFormDataList(@Param("formId") formId: string, @Query("page") page = 1, @Query("limit") limit = 10) {
    console.log("数据进来了", formId);
    try {
      const form: any = await this.formModel.findOne({ relateId: formId }).lean();
      const Model = await getFormDataModel(form._id, this.connection, this.formModel);
      const skip = (Number(page) - 1) * Number(limit);
      const list = await Model.find().skip(skip).limit(Number(limit)).lean();
      const total = await Model.countDocuments();
      return { list, total, page, limit };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
