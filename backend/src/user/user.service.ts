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

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async find(query: Partial<User>): Promise<User[]> {
    return await this.userModel.find(query).exec();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async create(data: Partial<User>): Promise<User> {
    return await this.userModel.create(data);
  }

  async updateById(id: string, update: Partial<User>): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, update).exec();
  }

  async deleteById(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async findPage(query: any, page: number, pageSize: number): Promise<{ data: User[]; total: number }> {
    const [data, total] = await Promise.all([
      this.userModel
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);
    return { data, total };
  }
}
