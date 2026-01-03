import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "./menu.entity";
import { keyBy } from "lodash-es";

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private menuRepository: Repository<Menu>) {}

  async save(menu: Menu) {
    const entity = this.menuRepository.create(menu);
    const result = await this.menuRepository.save(entity);
    return result;
  }

  async remove(ids: string[]) {
    return await this.menuRepository.delete(ids);
  }

  async findOne(id: string) {
    return await this.menuRepository.findOne({ where: { id } });
  }

  async findAll(pageNum: number, pageSize: number) {
    const [list, total] = await this.menuRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return { list, total, pageNum, pageSize, page: Math.ceil(total / pageSize) };
  }

  async findTree() {
    const list = await this.menuRepository.find();
    const mapping = keyBy(list, "id");
    const result: Menu[] = [];
    list.forEach((item) => {
      if (item.parentId && mapping[item.parentId]) {
        item.children ??= [];
        item.children.push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  }
}
