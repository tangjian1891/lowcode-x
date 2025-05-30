import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
@Schema()
export class Form {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  fields: any;
}

export const FormSchema = SchemaFactory.createForClass(Form);
