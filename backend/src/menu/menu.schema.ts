import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
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
  @Prop({ type: String })
  type: MenuType;
  @Prop({ type: String })
  subType: SubMenuType;
  @Prop({ type: Mongoose.Schema.Types.Mixed })
  value: string | Record<string, any>; //如果是 general,value就是整个表单配置. 如果是internal，value则是路由,external则是外部链接
  @Prop()
  icon?: string; // 菜单图标
  @Prop()
  parentId: string; // 父菜单ID
  @Prop({ default: 0 })
  order: number;
  @Prop({ required: true })
  systemId: string; //所属系统id
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
