import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";
@Entity()
export class Person extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
