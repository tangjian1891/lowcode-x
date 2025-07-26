import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { System } from "./system.schema";
import { Model } from "mongoose";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<System>) {}

  // 创建新记录
  async create(data: Partial<System> & { id?: string }): Promise<System> {
    if (data.id) {
      const system = await this.systemModel.findByIdAndUpdate(data.id, data).exec();
      if (!system) {
        throw new Error("数据不存在，更新失败");
      }
      return system;
    } else {
      return await this.systemModel.create(data);
    }
  }

  async remove(id: string | string[]): Promise<any> {
    if (!Array.isArray(id)) {
      id = [id];
    }
    return await this.systemModel.deleteMany({ _id: { $in: id } }).exec();
  }

  async info(id: string): Promise<System | null> {
    return this.systemModel.findById(id);
  }

  async page(query: any, page: number, pageSize: number): Promise<{ data: System[]; total: number }> {
    const [data, total] = await Promise.all([
      this.systemModel
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      this.systemModel.countDocuments(),
    ]);
    return { data, total };
  }
}
