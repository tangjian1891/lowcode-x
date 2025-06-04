import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./schemas/cats/cats.module";
import { FormModule } from "./form/form.module";
// 导入全局 ID 插件
import "./common/id-plugin";
import { MenuModule } from "./menu/menu.module";

const password = "user1";
const uri = `mongodb+srv://user1:${password}@cluster0.lhndjvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

@Module({
  imports: [MongooseModule.forRoot(uri), CatsModule, FormModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
