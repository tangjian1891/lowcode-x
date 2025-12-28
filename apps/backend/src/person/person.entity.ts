import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v7 } from "uuid";
@Entity()
export class Person {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = v7();
    }
  }
}
