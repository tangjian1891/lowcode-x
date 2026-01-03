import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class System extends BaseEntity {
  @Column()
  name: string;

  @Column()
  userId: string;
}
