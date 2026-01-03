import { Module } from "@nestjs/common";
import { SystemService } from "./system.service";
import { SystemController } from "./system.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { System } from "./system.entity";

@Module({
  imports: [TypeOrmModule.forFeature([System])],
  providers: [SystemService],
  controllers: [SystemController],
})
export class SystemModule {}
