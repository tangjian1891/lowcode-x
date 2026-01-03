import { Module } from "@nestjs/common";
import { FormService } from "./form.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormData } from "./entities/form-data.entity";
import { FormSchema } from "./entities/form-schema.entity";
import { FormSchemaController } from "./controllers/form-schema.controller";
import { FormDataController } from "./controllers/form-data.controller";

@Module({
  imports: [TypeOrmModule.forFeature([FormSchema, FormData])],
  controllers: [FormSchemaController, FormDataController],
  providers: [FormService],
})
export class FormModule {}
