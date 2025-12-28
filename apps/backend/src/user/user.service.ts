import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import { randomBytes, scrypt, scryptSync } from "node:crypto";
import { promisify } from "node:util";
import { CryptoUtil } from "src/common/utils/crypto.util";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async save(user: User) {
    if (!user.id) {
      const derivedPassword = await CryptoUtil.hashPassword(user.password);
      user.password = derivedPassword;
    }
    console.log(user);

    const entity = this.userRepository.create(user);
    return await this.userRepository.save(entity);
  }

  async remove(ids: string[]) {
    return await this.userRepository.delete(ids);
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(pageNum: number, pageSize: number) {
    const [list, total] = await this.userRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return { list, total, pageNum, pageSize, pages: Math.ceil(total / pageSize) };
  }

  async verifyPassword(user: User) {
    const u = await this.userRepository.findOne({
      where: { username: user.username },
    });
    console.log("没搜到吗", u);

    if (!u) {
      return null;
    }

    const flag = await CryptoUtil.verifyPassword(user.password, u.password);
    console.log("没有吗", flag);

    return flag ? u : null;
  }

  // async getJwtToken(payload: { username: string; password: string }): Promise<string> {
  //   return await this.jwtService.signAsync({ username: payload.username });
  // }

  // async create(data: Partial<User> & { id?: string }): Promise<User> {
  //   if (data.id) {
  //     const updatedUser = await this.userModel.findByIdAndUpdate(data.id, data).exec();
  //     if (!updatedUser) {
  //       throw new Error(`用户不存在，更新失败`);
  //     }
  //     return updatedUser;
  //   } else {
  //     return await this.userModel.create(data);
  //   }
  // }

  // async remove(id: string | string[]): Promise<any> {
  //   if (Array.isArray(id)) {
  //     return await this.userModel.deleteMany({ _id: { $in: id } }).exec();
  //   } else {
  //     return await this.userModel.findByIdAndDelete(id).exec();
  //   }
  // }

  // async info(id: string): Promise<User | null> {
  //   return await this.userModel.findById(id).exec();
  // }

  // async page(query: any, page: number, pageSize: number): Promise<{ data: User[]; total: number }> {
  //   const [data, total] = await Promise.all([
  //     this.userModel
  //       .find(query)
  //       .skip(page - 1)
  //       .limit(pageSize)
  //       .exec(),
  //     this.userModel.countDocuments(query).exec(),
  //   ]);
  //   return { data, total };
  // }
  // async find(query: any): Promise<User[]> {
  //   return await this.userModel.find(query).exec();
  // }
}
