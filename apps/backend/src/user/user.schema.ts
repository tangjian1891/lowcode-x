import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
/**
 * 用户实体类，表示系统中的用户信息。
 *
 * @property {string} username 用户名，唯一标识用户的登录名。
 * @property {string} password 用户密码，经过加密存储。
 * @property {string} nickname 用户昵称，用于展示。
 * @property {string} email 用户邮箱地址。
 * @property {string} phone 用户手机号。
 * @property {string} avatar 用户头像图片的URL。
 * @property {string} status 用户状态（如 active: 活跃, disabled: 禁用, frozen: 冻结），默认值为 "active"。
 * @property {string[]} roles 用户角色列表，决定用户权限，默认为空数组。
 */
export class User {
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  @Prop()
  nickname: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  avatar: string;
  @Prop({ default: "active" })
  status: string; // 状态（如 active, disabled, frozen）
  @Prop({ type: [String], default: [] })
  roles: string[]; // 角色
}

export const UserSchema = SchemaFactory.createForClass(User);
