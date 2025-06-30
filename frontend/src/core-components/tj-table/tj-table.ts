import { Button } from "@/form-components";
import { Permission } from "@/utils/permissions";
import { api } from "@/api";

interface TjTableParams {
  fields?: any[];
  permisson?: string[];
  menuId?: string;
  data?: any[];
  extraButtons?: {
    toolbar?: any[];
    inline?: any[];
  };
}

export class TjTable {
  oids: any[] = [];
  fields: any[] = [];
  form = {};
  data: any[] = [];
  loading = false;
  menuId: string | null = null;
  toolbar = {
    buttons: [] as any[],
    search: true,
    sort: true,
    refresh: true,
    fullscreen: true,
  };
  grid = { buttons: [] as any[] };
  pagination = {
    pageSize: 50,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    currentPage: 1,
  };
  permisson: string[] = [];

  constructor(params: TjTableParams = {}) {
    Object.assign(this, params);
    this.fields = params.fields || [];
    this.permisson = params.permisson || []; // 权限列表
    this.menuId = params.menuId || null;
    this.data = params.data || [];

    // 处理权限，权限需要自动处理手动注入的按钮
    this.toolbar.buttons = this.processToolbarButtons(this.permisson, params.extraButtons?.toolbar);
    this.grid.buttons = this.processInlineButtons(this.permisson, params.extraButtons?.inline);
  }

  /**
   * 获取表格数据
   */
  async loadData(): Promise<void> {
    if (!this.menuId) {
      console.warn("menuId is required for loading data");
      return;
    }

    try {
      this.loading = true;
      const response = await api.form.getList(this.menuId);
      const data = response as any; // 临时处理类型

      // 根据您的 API 返回结构调整
      this.data = Array.isArray(data) ? data : data.list || [];
      this.pagination.total = data.total || this.data.length;
    } catch (error) {
      console.error("Failed to load table data:", error);
      this.data = [];
      this.pagination.total = 0;
    } finally {
      this.loading = false;
    }
  }

  /**
   * 刷新数据
   */
  async refresh(): Promise<void> {
    await this.loadData();
  }

  /**
   * 重置到第一页并刷新
   */
  async reset(): Promise<void> {
    this.pagination.currentPage = 1;
    await this.loadData();
  }

  /**
   * 分页改变时的处理
   */
  async handlePageChange(page: number): Promise<void> {
    this.pagination.currentPage = page;
    await this.loadData();
  }

  /**
   * 页大小改变时的处理
   */
  async handlePageSizeChange(pageSize: number): Promise<void> {
    this.pagination.pageSize = pageSize;
    this.pagination.currentPage = 1;
    await this.loadData();
  }
  /**
   * 获取工具栏按钮
   */
  processToolbarButtons(permission: string[], extraButtons: any[] = []): any[] {
    const buttons = [];
    if (permission.includes(Permission.ADD)) {
      buttons.push(Button.createAddButton());
    }
    if (permission.includes(Permission.DELETE)) {
      buttons.push(Button.createBatchDeleteButton());
    }
    buttons.push(...extraButtons);
    return buttons;
  }
  // 获取行内按钮
  processInlineButtons(permission: string[], extraButtons: any[] = []): any[] {
    const buttons = [];
    if (permission.includes(Permission.EDIT)) {
      buttons.push(Button.createEditButton());
    }
    if (permission.includes(Permission.DELETE)) {
      buttons.push(Button.createInlineDeleteButton());
    }
    buttons.push(...extraButtons);
    return buttons;
  }
}

type generalType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K];
};

export type ITjTable = generalType<TjTable>;
