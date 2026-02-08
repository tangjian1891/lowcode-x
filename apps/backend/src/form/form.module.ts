import { Module } from "@nestjs/common";
import { FormSchemaService } from "./services/form-schema.service";
import { FormDataService } from "./services/form-data.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormData } from "./entities/form-data.entity";
import { FormSchema } from "./entities/form-schema.entity";
import { FormSchemaController } from "./controllers/form-schema.controller";
import { FormDataController } from "./controllers/form-data.controller";

@Module({
  imports: [TypeOrmModule.forFeature([FormSchema, FormData])],
  controllers: [FormSchemaController, FormDataController],
  providers: [FormSchemaService, FormDataService],
  exports: [FormSchemaService, FormDataService],
})
export class FormModule {}
