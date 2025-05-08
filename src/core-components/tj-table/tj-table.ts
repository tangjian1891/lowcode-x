import { Button } from '@/form-components'
import { Permission } from '@/utils/permissions'

export class TjTable {
  oids = []
  fields = []
  form = {}
  toolbar = {
    buttons: [],
    search: true,
    sort: true,
    refresh: true,
    fullscreen: true,
  }
  grid = { buttons: [] }
  pagination = {
    pageSize: 50,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    currentPage: 1,
  }
  permisson = []
  constructor(params: Partial<JasTable>) {
    Object.assign(this, params)
    this.fields = params.fields || []
    this.permisson = params.permisson || [] // 权限列表

    // 处理权限，权限需要自动处理手动注入的按钮
    this.toolbar.buttons = this.processToolbarButtons(this.permisson, params.extraButtons?.toolbar)
    this.grid.buttons = this.processInlineButtons(this.permisson, params.extraButtons?.inline)
  }
  /**
   * 获取工具栏按钮
   */
  processToolbarButtons(permission: string[], extraButtons = []): any[] {
    const buttons = []
    if (permission.includes(Permission.ADD)) {
      buttons.push(Button.createAddButton())
    }
    if (permission.includes(Permission.DELETE)) {
      buttons.push(Button.createBatchDeleteButton())
    }
    buttons.push(...extraButtons)
    return buttons
  }
  // 获取行内按钮
  processInlineButtons(permission: string[], extraButtons = []): any[] {
    const buttons = []
    if (permission.includes(Permission.EDIT)) {
      buttons.push(Button.createEditButton())
    }
    if (permission.includes(Permission.DELETE)) {
      buttons.push(Button.createInlineDeleteButton())
    }
    buttons.push(...extraButtons)
    return buttons
  }
}

type generalType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type ITjTable = generalType<TjTable>
