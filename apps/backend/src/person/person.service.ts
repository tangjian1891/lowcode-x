import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "./person.entity";

@Injectable()
export default class PersonService {
  constructor(@InjectRepository(Person) private personRepository: Repository<Person>) {}

  findAll() {
    return this.personRepository.find();
  }
}
