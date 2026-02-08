import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormSchema } from "../entities/form-schema.entity";

@Injectable()
export class FormSchemaService {
  constructor(@InjectRepository(FormSchema) private formSchemaRepository: Repository<FormSchema>) {}

  async saveFormSchema(formSchema: FormSchema) {
    const entity = this.formSchemaRepository.create(formSchema);
    return this.formSchemaRepository.save(entity);
  }

  async findOneFormSchema(menuId: string) {
    return this.formSchemaRepository.findOne({ where: { menuId } });
  }

  async removeFormSchema(ids: string[]) {
    return this.formSchemaRepository.delete(ids);
  }

  async findListFormSchema(pageNum: number, pageSize: number) {
    const [list, total] = await this.formSchemaRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return { list, total, pageNum, pageSize, pages: Math.ceil(total / pageSize) };
  }
}
