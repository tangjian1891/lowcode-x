import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
enum SubMenuType {
  GENERAL_FORM = "general", // 通用表单  value： formId。注册时，动态包装。
  INTERNAL = "internal", // 自定义表单  value： 路由的name。路由的name需要和组件name保持一致，这样才能keep-alive
  EXTERNAL_MENU = "external", // 外部菜单 。内部iframe嵌入。
}
enum MenuType {
  FOLDER = "folder", // 目录
  MENU = "menu", // 菜单
  PERMISSION = "permission", // 按钮。权限code
}
@Schema({ timestamps: true })
export class Menu {
  @Prop()
  name: string;
  // @Prop({ type: String })
  // type: MenuType;
  // @Prop({ type: String })
  // subType: SubMenuType;
  @Prop()
  value: string;
  @Prop()
  icon?: string; // 菜单图标
  @Prop()
  parentId: string; // 父菜单ID
  //   @Prop({ type: [{ type: String, ref: "Menu" }], default: [] })
  //   children: Menu[]; // 子菜单列表
  @Prop({ default: 0 })
  order: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
