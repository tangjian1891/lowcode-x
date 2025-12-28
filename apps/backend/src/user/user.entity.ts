import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

export enum UserStatus {
  ACTIVE = "active",
  DISABLED = "disabled",
  FROZEN = "frozen",
}

@Entity()
export default class User extends BaseEntity {
  @Column({ comment: "用户名" })
  username: string;

  @Column({ comment: "密码（加密后存储）" })
  password: string;

  @Column({ comment: "昵称", nullable: true })
  nickname?: string;

  @Column({ comment: "邮箱", nullable: true })
  email?: string;

  @Column({ comment: "手机号", nullable: true })
  phone?: string;

  @Column({ comment: "头像URL", nullable: true })
  avatar?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: UserStatus.ACTIVE,
    comment: "状态（如 active, disabled, frozen）",
  })
  status?: UserStatus;
}
