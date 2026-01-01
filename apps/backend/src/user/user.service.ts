import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  getSecretStr(): string {
    const secret = this.configService.get<string>("SECRET");
    if (!secret) {
      throw new Error("SECRET is not defined");
    }
    return secret;
  }

  async save(user: User) {
    if (!user.id) {
      const secret = this.getSecretStr();
      const hashPassword = await argon2.hash(user.password, {
        secret: Buffer.from(secret),
      });
      user.password = hashPassword;
    }

    const entity = this.userRepository.create(user);
    return await this.userRepository.save(entity);
  }

  async generateToken(user: User) {
    const jwt = await this.jwtService.signAsync({ username: user.username, sub: user.id });

    return jwt;
  }

  async verifyPassword(user: User) {
    const u = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (!u) {
      return null;
    }
    const secret = this.getSecretStr();
    const flag = await argon2.verify(u.password, user.password, { secret: Buffer.from(secret) });

    return flag ? u : null;
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

  async getJwtToken(payload: { username: string; password: string }): Promise<string> {
    return await this.jwtService.signAsync({ username: payload.username });
  }

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
