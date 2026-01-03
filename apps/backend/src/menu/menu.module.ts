import { Module } from "@nestjs/common";
import { MenuControll } from "./menu.controll";
import { MenuService } from "./menu.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Menu } from "./menu.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuControll],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
