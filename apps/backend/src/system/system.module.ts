import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "./system.schema";
import { SystemService } from "./system.service";
import { SystemController } from "./system.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }])],
  providers: [SystemService],
  controllers: [SystemController],
})
export class SystemModule {}
