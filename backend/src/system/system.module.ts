import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }])],
  // providers:[systemser]
})
export class SystemModule {}
