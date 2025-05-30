import { Injectable } from "@nestjs/common";
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

  async updateById(data: any) {
    const created = new this.model(data);
    return await created.updateOne(data);
  }
}
