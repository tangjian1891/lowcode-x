import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./schemas/cats/cats.module";
import { FormModule } from "./form/form.module";

const password = "lafiTtbH3FufPR5c";
const uri = `mongodb+srv://tangjian1891:${password}@cluster0.lhndjvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

@Module({
  imports: [MongooseModule.forRoot(uri), CatsModule, FormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
