import { nanoid } from 'nanoid'

// 菜单类型枚举
enum MenuType {
  FOLDER = 'folder', // 目录
  MENU = 'menu', // 菜单
  PERMISSION = 'permission', // 按钮。权限code
}
// 菜单子类型枚举
enum MenuSubType {
  GENERAL_FORM = 'general', // 通用表单  value： formId。注册时，动态包装。
  CUSTOM_FORM = 'internal', // 自定义表单  value： 路由的name。路由的name需要和组件name保持一致，这样才能keep-alive
  EXTERNAL_MENU = 'external', // 外部菜单 。内部iframe嵌入。
}

export class Menu {
  id: string = nanoid() // 菜单ID
  name: string = '' // 菜单名称
  type: MenuType = MenuType.FOLDER // 菜单类型，1：目录，2：菜单，3：按钮
  subType: MenuSubType | null = null // 菜单子类型，1：通用表单，2：自定义表单，3：外部菜单
  value: string = '' // 菜单值，路由地址或权限标识
  icon?: string // 菜单图标
  parentId: string = '' // 父菜单ID
  children: Menu[] = [] // 子菜单列表
  order: number = 0 // 菜单排序
  constructor(menu: Partial<Menu> = {}) {
    Object.assign(this, menu)
  }
}

class JasLayout {
  systemId: string = '' // 系统ID
  menuList: Menu[] = [] // 菜单列表
  keepAliveList: string[] = [] // 需要缓存的路由列表
  constructor(systemId: string) {
    this.systemId = systemId
  }

  async getMenuListBySystemId() {}
  static goRoute(router, menu) {}
}

export { JasLayout }
