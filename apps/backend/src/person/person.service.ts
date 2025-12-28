import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "./person.entity";

@Injectable()
export default class PersonService {
  constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {}

  save(person: Person) {
    const entity = this.personRepository.create(person);
    return this.personRepository.save(entity);
  }

  remove(ids: string[]) {
    return this.personRepository.delete(ids);
  }

  findOne(id: string) {
    return this.personRepository.findOne({
      where: { id },
    });
  }

  async findAll(pageNum: number, pageSize: number) {
    const [list, total] = await this.personRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
    const pages = Math.ceil(total / pageSize);
    return { list, total, pages, pageNum, pageSize };
  }
}
