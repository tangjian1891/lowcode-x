import { Controller, Get } from "@nestjs/common";
import PersonService from "./person.service";

@Controller("person")
export default class PersonController {
  constructor(private personService: PersonService) {}
  @Get()
  test() {
    return this.personService.findAll();
  }
}
