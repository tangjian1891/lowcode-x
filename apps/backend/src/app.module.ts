import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FormModule } from "./form/form.module";
// 导入全局 ID 插件
import { UserModule } from "./user/user.module";
// import { APP_GUARD } from "@nestjs/core";
import { SystemModule } from "./system/system.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuModule } from "./menu/menu.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MenuModule,
    FormModule,
    SystemModule,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
