import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";
@Entity()
export class FormSchema extends BaseEntity {
  @Column({ comment: "租户ID", nullable: true })
  tenantId: string;
  @Column({ comment: "表单名称" })
  name: string;
  @Column({ comment: "菜单ID,关联菜单表，同样可以查询", nullable: true })
  menuId: string;

  @Column({ type: "jsonb", comment: "表单属性配置", nullable: true })
  config: any;

  @Column({ type: "jsonb", comment: "表单字段配置,列表结构的数据字段" })
  fields: any;

  @Column({ comment: "表单描述", default: "" })
  description: string;
}
