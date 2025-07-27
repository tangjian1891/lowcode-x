import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getJwtToken(payload: { username: string; password: string }): Promise<string> {
    return await this.jwtService.signAsync({ username: payload.username });
  }

  async create(data: Partial<User> & { id?: string }): Promise<User> {
    if (data.id) {
      const updatedUser = await this.userModel.findByIdAndUpdate(data.id, data).exec();
      if (!updatedUser) {
        throw new Error(`用户不存在，更新失败`);
      }
      return updatedUser;
    } else {
      return await this.userModel.create(data);
    }
  }

  async remove(id: string | string[]): Promise<any> {
    if (Array.isArray(id)) {
      return await this.userModel.deleteMany({ _id: { $in: id } }).exec();
    } else {
      return await this.userModel.findByIdAndDelete(id).exec();
    }
  }

  async info(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async page(query: any, page: number, pageSize: number): Promise<{ data: User[]; total: number }> {
    const [data, total] = await Promise.all([
      this.userModel
        .find(query)
        .skip(page - 1)
        .limit(pageSize)
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);
    return { data, total };
  }
  async find(query: any): Promise<User[]> {
    return await this.userModel.find(query).exec();
  }
}
