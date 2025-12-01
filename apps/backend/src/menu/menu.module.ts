import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Menu, MenuSchema } from "./menu.schema";
import { FormSchema } from "src/form/form.schema";
import { MenuControll } from "./menu.controll";
import { MenuService } from "./menu.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])],
  controllers: [MenuControll],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
