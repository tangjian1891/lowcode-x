import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class System {
  @Prop()
  name: string;
  @Prop({ type: String, ref: "User" })
  userId: string;
}

export const SystemSchema = SchemaFactory.createForClass(System);
