import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
@Schema({ timestamps: true }) // 启用自动时间戳
export class Form {
  @Prop({ index: true, unique: true })
  relateId: string;
  // 不再需要显式定义 id 字段，因为全局插件会添加虚拟 id 属性
  @Prop({ type: mongoose.Schema.Types.Mixed })
  fields: any;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  formTree: any;
}

export const FormSchema = SchemaFactory.createForClass(Form);
