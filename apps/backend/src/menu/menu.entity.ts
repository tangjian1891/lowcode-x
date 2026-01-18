import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";
import { Menu as MenuModel } from "./menu.model";

@Entity()
export class Menu extends BaseEntity {
  @Column({ type: "varchar", comment: "菜单名称" })
  name: string;

  @Column({ type: "varchar", comment: "菜单类型" })
  type: MenuModel["type"];

  @Column({ type: "varchar", comment: "页面类型，type为page时有效", nullable: true })
  pageType?: MenuModel["pageType"];

  @Column({ type: "varchar", nullable: true, comment: "菜单值，根据menuType不同而不同" })
  value?: string;

  @Column({ type: "varchar", nullable: true })
  icon?: string;

  @Column({ type: "varchar", nullable: true })
  parentId: string;

  @Column({ type: "int", default: 0 })
  order: number;

  @Column({ type: "varchar" })
  systemId: string;

  children?: Menu[];
}
