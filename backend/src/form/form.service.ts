import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Form } from "./form.schema";
import mongoose, { Connection, Model } from "mongoose";

@Injectable()
export class FormService {
  private modelCache: Map<string, mongoose.Model<any>> = new Map();
  constructor(
    @InjectModel(Form.name) private model: Model<Form>,
    @InjectConnection() private connection: Connection,
  ) {}

  // 查询表单列表，支持分页和关键词搜索
  async findAll(page = 1, limit = 10, keyword?: string) {
    const skip = (page - 1) * limit;

    // 构建查询条件
    const query = keyword ? { "fields.title": { $regex: keyword, $options: "i" } } : {};

    // 执行查询并计算总数
    const [items, total] = await Promise.all([
      this.model.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).exec(),
      this.model.countDocuments(query).exec(),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // 根据ID查询单个表单
  async findById(id: string) {
    const form = await this.model.findById(id);
    if (!form) {
      throw new NotFoundException(`表单ID为 ${id} 的记录不存在`);
    }
    return form;
  }

  // 创建表单
  async create(data: any) {
    const created = new this.model({
      ...data,
    });
    this.patchAndUpdateCollection(created.id, data.fields, []);
    return await created.save();
  }

  // 更新表单
  async update(id: string, data: any) {
    const form = await this.findById(id);
    const updated = await this.model.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      { new: true },
    );

    this.patchAndUpdateCollection(form.id, form.fields, data.fields);
    if (!updated) {
      throw new NotFoundException(`表单ID为 ${id} 的记录不存在`);
    }

    return updated;
  }

  // 删除单个表单
  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`表单ID为 ${id} 的记录不存在`);
    }
    return { success: true, id };
  }

  // 批量删除表单
  async removeMany(ids: string[]): Promise<{ deletedCount: number }> {
    return await this.model.deleteMany({ _id: { $in: ids } });
  }

  /**
   * 批量更新表单集合
   */
  async patchAndUpdateCollection(id, newFields: any[], oldFields) {
    console.log("表单ID:", id);
    const schemaObject = newFields.reduce((initVal, item) => {
      initVal[item.id] = String;
      return initVal;
    }, {});

    const model = this.connection.model(id, new mongoose.Schema(schemaObject));
    this.modelCache.set(id, model);
    console.log("查看一下模型", model);
    const res = await model.create({ cqN35b1KVAXHQ1h_32VRkn: "测试数据", yKyxQ2hhPwDt4UY1CNVI_c: "测试数据" });
  }
}
