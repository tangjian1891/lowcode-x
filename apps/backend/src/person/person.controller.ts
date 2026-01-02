import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import PersonService from "./person.service";
import { Person } from "./person.entity";

@Controller("person")
export default class PersonController {
  constructor(private personService: PersonService) {}
  @Post("save")
  save(@Body() person: Person) {
    return this.personService.save(person);
  }

  @Post("delete")
  remove(@Body("ids") ids: string[]) {
    return this.personService.remove(ids);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.personService.findOne(id);
  }

  @Post("list")
  findAll(@Body() body: any) {
    return this.personService.findAll(body.pageNum, body.pageSize);
  }
}
