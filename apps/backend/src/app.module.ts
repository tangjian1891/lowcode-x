import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: "postgres",
          host: configService.get("sql_host"),
          port: 5432,
          username: "admin",
          password: configService.get("sql_password"),
          database: "lowcode_x_db",
          autoLoadEntities: true,
          synchronize: true,
        };
      },
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
