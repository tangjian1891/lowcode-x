import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { System } from "./system.entity";
import { Repository } from "typeorm";

@Injectable()
export class SystemService {
  constructor(@InjectRepository(System) private systemRepository: Repository<System>) {}

  async save(system: System) {
    console.log(system);

    const entity = this.systemRepository.create(system);
    const result = await this.systemRepository.save(entity);

    return result;
  }

  async remove(ids: string[]) {
    return await this.systemRepository.delete(ids);
  }

  async findOne(id: string) {
    return this.systemRepository.findOne({ where: { id } });
  }

  async findAll(pageNum: number, pageSize: number) {
    const [list, total] = await this.systemRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return { list, total, pageNum, pageSize, page: Math.ceil(total / pageSize) };
  }
}
