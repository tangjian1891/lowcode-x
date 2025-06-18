import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async getJwtToken(payload: { username: string; password: string }): Promise<string> {
    if (payload.username === "admin" && payload.password === "123456") {
      payload["role"] = "admin";
      return await this.jwtService.signAsync({ username: payload.username });
    } else {
      throw new Error("账号或密码错误");
    }
    // access_token
  }
}
