import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { System } from "./system.schema";
import { Model } from "mongoose";

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<System>) {}

  // 查询所有
  async findAll(query: any): Promise<System[]> {
    return await this.systemModel.find(query).exec();
  }

  // 根据ID查询
  async findById(id: string): Promise<System | null> {
    return await this.systemModel.findById(id).exec();
  }

  // 创建新记录
  async create(data: Partial<System>): Promise<System> {
    return await this.systemModel.create(data);
  }

  // 根据ID更新
  async updateById(id: string, update: Partial<System>): Promise<System | null> {
    return await this.systemModel.findByIdAndUpdate(id, update).exec();
  }

  // 根据ID删除
  async deleteById(id: string): Promise<any> {
    return await this.systemModel.findByIdAndDelete(id).exec();
  }

  // 分页查询
  async findPage(query: any, page: number, pageSize: number): Promise<{ data: System[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      this.systemModel.find(query).skip(skip).limit(pageSize).exec(),
      this.systemModel.countDocuments(query).exec(),
    ]);
    return { data, total };
  }
}
