class JasLayout {
  systemId: string = '' // 系统ID
  menuList: any[] = [] // 菜单列表
  keepAliveList: any[] = [] // 需要缓存的路由列表
  constructor(systemId: string) {
    this.systemId = systemId
  }

  async getMenuListBySystemId() {}
  static goRoute(router, menu) {}
}

export { JasLayout }
