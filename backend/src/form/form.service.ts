import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Form } from "./form.schema";
import { Model } from "mongoose";

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private model: Model<Form>) {}
  getDataById() {
    return "获取到了";
  }

  save(data: any) {
    const created = new this.model(data);
    return created.save();
  }

  async getById(id: string) {
    const data = await this.model.findById(id);
    return data;
  }

  updateById(data: any) {
    const created = new this.model(data);
    return created.updateOne(data);
  }
  // async deleteOne(id: string) {
  //   return await this.model.deleteOne({ _id: id });
  // }

  async deleteMany(ids: string[]): Promise<{ deletedCount: number }> {
    return await this.model.deleteMany({ _id: { $in: ids } });
  }
  // async deleteMany(ids: string[]): Promise<{ deletedCount: number }> {
  //   return await this.model.deleteMany({ _id: { $in: ids } });
  // }
}
