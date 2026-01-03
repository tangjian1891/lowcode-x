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
}
