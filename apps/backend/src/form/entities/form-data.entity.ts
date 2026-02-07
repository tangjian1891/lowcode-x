import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class FormData extends BaseEntity {
  @Column({ nullable: true })
  tenantId: string;
  @Column()
  formId: string;

  @Column({ type: "jsonb", comment: "表单数据" })
  data: any;
}
