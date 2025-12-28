import { BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v7 } from "uuid";

export default class BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @CreateDateColumn({ comment: "创建时间" })
  createTime: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updateTime: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v7();
    }
  }
}
