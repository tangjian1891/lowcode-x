import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Form } from "./form.schema";
import mongoose, { Connection, Model } from "mongoose";
import { Menu } from "src/menu/menu.schema";
import { MenuService } from "src/menu/menu.service";

@Injectable()
export class FormService {
  private modelCache: Map<string, mongoose.Model<any>> = new Map();
  constructor(
    @InjectModel(Form.name) private model: Model<Form>,
    @InjectConnection() private connection: Connection,
    private menuService: MenuService,
  ) {}
  // 获取动态表单模型
  async getDynamicModel(menuId: string) {
    const modelName: string = `dynamic_form_${menuId}`;
    let model = this.connection.models[modelName];
    if (!model) {
      const menu = await this.menuService.info(menuId);
      if (!menu) {
        throw new NotFoundException(`菜单ID为 ${menuId} 的记录不存在`);
      }
      const schema = this.getModelByMenu(menu);
      model = this.connection.model(modelName, schema);
    }
    return model;
  }
  // 根据菜单转换为model
  getModelByMenu(menu: Menu) {
    // 类型保护，兼容 menu.fields 和 menu.value.fields
    let fields: Array<{ id: string }> = [];
    if (menu && typeof menu.value === "object" && Array.isArray(menu.value.fields)) {
      fields = menu.value.fields;
    }
    if (fields.length > 0) {
      const schemaObject = fields.reduce(
        (obj, field) => {
          obj[field.id] = { type: String };
          return obj;
        },
        {} as Record<string, any>,
      );
      const schema = new mongoose.Schema(schemaObject, { timestamps: true });
      return schema;
    }
    return new mongoose.Schema({}, { timestamps: true });
  }

  async create(menuId: string, data: any) {
    const model = await this.getDynamicModel(menuId);
    if (data.id) {
      return await model.findByIdAndUpdate(data.id, data);
    } else {
      return await model.create(data);
    }
  }

  async remove(menuId: string, id: string | string[]) {
    if (!Array.isArray(id)) {
      id = [id];
    }
    const model = await this.getDynamicModel(menuId);
    return await model.deleteMany({ _id: { $in: id } });
  }

  async info(menuId: string, id: string) {
    const model = await this.getDynamicModel(menuId);
    return await model.findById(id);
  }

  async page(menuId: string, query: any, page: number, pageSize: number): Promise<{ data: any[]; total: number }> {
    const model = await this.getDynamicModel(menuId);
    const [data, total] = await Promise.all([
      model
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      model.countDocuments(query).exec(),
    ]);
    return { data, total };
  }

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
  // 根据relateId查询单个表单
  async findByRelateId(relateId: string) {
    const form = await this.model.findOne({ relateId });
    if (!form) {
      throw new NotFoundException(`关联ID为 ${relateId} 的表单记录不存在`);
    }

    return form;
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
    const res = await model.create({ cqN35b1KVAXHQ1h_32VRkn: "测试数据", yKyxQ2hhPwDt4UY1CNVI_c: "测试数据" });
  }
}
