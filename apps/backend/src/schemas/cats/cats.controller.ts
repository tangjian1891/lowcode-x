import { Body, Controller, Get, Post } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "../cat.schema";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    console.log("进来了");

    return this.catsService.findAll();
  }
  @Get("mock")
  async createMock(): Promise<Cat> {
    const mockCat: CreateCatDto = {
      name: "Mock Cat",
      age: 2,
      breed: "Siamese",
    };
    return this.catsService.create(mockCat);
  }
}
