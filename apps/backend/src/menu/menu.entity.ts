import BaseEntity from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

enum Type {
  FOLDER = "folder",
  PAGE = "page",
  BUTTON = "button",
}

enum PageType {
  LINK = "link", //http://www.baidu.com
  VIEW = "view", //内部视图
  FORM = "form", //自动表单
}
@Entity()
export class Menu extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "varchar" })
  type: Type;

  @Column()
  pageType: PageType;

  @Column({ comment: "菜单值，根据menuType不同而不同" })
  value: string;

  @Column()
  icon?: string;

  @Column({ nullable: true })
  parentId: string;

  @Column()
  order: number;

  @Column()
  systemId: string;

  children?: Menu[];
}
