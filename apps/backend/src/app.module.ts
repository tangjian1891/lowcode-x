import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./schemas/cats/cats.module";
import { FormModule } from "./form/form.module";
// 导入全局 ID 插件
// import "./common/id-plugin";
import { MenuModule } from "./menu/menu.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./common/auth.guard";
import { SystemModule } from "./system/system.module";
import PersonModule from "./person/person.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: ".env",
    //   isGlobal: true,
    // }),
    // MongooseModule.forRoot(uri),
    // CatsModule,
    // FormModule,
    // MenuModule,
    // UploadModule,
    // SystemModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "123.57.237.100",
      port: 5432,
      username: "admin",
      password: "passwordpassword",
      database: "lowcode_x_db",
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
