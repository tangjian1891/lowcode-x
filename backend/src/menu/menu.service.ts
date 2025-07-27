import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Menu } from "./menu.schema";
import { Connection, Model } from "mongoose";

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuService: Model<Menu>,
    @InjectConnection() private connection: Connection,
  ) {}
  /**
   * 获取菜单树
   */
  async tree(): Promise<any[]> {
    // 查询所有菜单
    const menus = await this.menuService.find().lean();

    // 构建id到菜单的映射
    const menuMap = new Map<string, any>();
    menus.forEach((menu: any) => {
      menu.children = [];
      menuMap.set(menu._id.toString(), menu);
    });

    // 构建树结构
    const tree: any[] = [];
    menus.forEach((menu: any) => {
      menu.id = menu._id;
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId.toString());
        if (parent) {
          parent.children.push(menu);
        }
      } else {
        tree.push(menu);
      }
    });
    return tree;
  }

  async info(id: string): Promise<Menu | null> {
    return await this.menuService.findById(id);
  }

  async create(data: Menu & { id?: string }) {
    let res;
    if (data.id) {
      res = await this.menuService.findByIdAndUpdate(data.id, data).exec();
      // 移除已有模型
      const modelName: string = `dynamic_form_${data.id}`;
      if (this.connection.models[modelName]) {
        this.connection.deleteModel(modelName);
      }
    } else {
      res = await this.menuService.create(data);
    }

    return res;
  }

  async remove(id: string | string[]): Promise<any> {
    if (!Array.isArray(id)) {
      id = [id];
    }
    return await this.menuService.deleteMany({ _id: { $in: id } }).exec();
  }
}
