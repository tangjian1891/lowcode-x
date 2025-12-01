import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/response.interceptor";
import { AllExceptionsFilter } from "./common/exception.filter";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  // 启用 CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
