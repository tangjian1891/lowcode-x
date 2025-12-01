import { Module } from "@nestjs/common";
import { FormController } from "./form.controller";
import { FormService } from "./form.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Form, FormSchema } from "./form.schema";
import { MenuModule } from "src/menu/menu.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]), MenuModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
