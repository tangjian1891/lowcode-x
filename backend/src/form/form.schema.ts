import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
@Schema()
export class Form {
  // 不再需要显式定义 id 字段，因为全局插件会添加虚拟 id 属性
  @Prop({ type: mongoose.Schema.Types.Mixed })
  fields: any;
}

export const FormSchema = SchemaFactory.createForClass(Form);
