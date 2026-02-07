import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FormSchema } from "./entities/form-schema.entity";
import { Repository } from "typeorm";
import { FormData } from "./entities/form-data.entity";

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormSchema) private formSchemaRepository: Repository<FormSchema>,
    @InjectRepository(FormData) private formDataRepository: Repository<FormData>,
  ) {}

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

  // 表单数据

  async saveFormData(formData: FormData) {
    const entity = this.formDataRepository.create(formData);
    return this.formDataRepository.save(entity);
  }

  async removeFormData(ids: string[]) {
    return this.formDataRepository.delete(ids);
  }

  async findOneFormData(id: string) {
    return this.formDataRepository.findOne({ where: { id } });
  }

  async findListFormData(formId: string, pageNum: number, pageSize: number) {
    const [list, total] = await this.formDataRepository.findAndCount({
      where: { formId },

      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
    const flagList = list.map((item) => {
      return { ...item, ...item.data, data: undefined };
    });

    return { list: flagList, total, pageNum, pageSize, pages: Math.ceil(total / pageSize) };
  }

  async initFormData(menuId: string) {
    const schema = await this.findOneFormSchema(menuId);
    if (!schema) {
      throw new NotFoundException("Form schema not found");
    }

    const data: Record<string, any> = {};
    if (schema.fields && Array.isArray(schema.fields)) {
      schema.fields.forEach((field: any) => {
        const key = field.id;
        if (key) {
          data[key] = field.fieldProps?.defaultValue ?? null;
        }
      });
    }

    return data;
  }
}
