import { Button } from "@/form-components";
import { Permission } from "@/utils/permissions";
import { api } from "@/api";
import RenderTableHeader from "./tj-grid/render-table-header.vue";
import type { VxeGridInstance, VxeGridProps } from "vxe-table";
import { createInlineButtonFactory } from "../components/button/create-inline-button";
import RenderOperatorColumn from "./tj-grid/render-operator-column.vue";
import { createToolbarButtonFactory } from "../components/button/create-toolbar-button";
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
class Reactive {
  constructor() {
    return reactive(this);
  }
}

export class TjTable extends Reactive {
  oids: any[] = [];
  fields: any[] = [];
  form = {};
  data: any[] = [];
  dataLoading = false;
  isFullscreen = false;
  menuId: string | null = null;
  columns: any[] = [];
  grid: VxeGridProps = {};
  gridRef = null;
  toolbar = {
    buttons: [] as any[],
    inlineButtons: [] as any[],
    search: true,
    visible: true,
    sort: true,
    refresh: true,
    fullscreen: true,
  };
  pagination = {
    pageSize: 50,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    currentPage: 1,
  };
  permisson: string[] = [];

  constructor(params: TjTableParams = {}) {
    super();
    Object.assign(this, params);
    this.fields = params.fields || [];
    this.permisson = params.permisson || []; // 权限列表
    this.menuId = params.menuId || null;
    this.data = params.data || [];

    // 处理权限，权限需要自动处理手动注入的按钮
    const buttonFactory = createToolbarButtonFactory(this);
    this.toolbar.buttons = [buttonFactory.add(), buttonFactory.remove()];
    const inlineFactory = createInlineButtonFactory(this);
    this.toolbar.inlineButtons = [inlineFactory.edit(), inlineFactory.detail(), inlineFactory.delete()];

    // 使用字段，初始化vxe-table的列配置
    this.initGrid();
  }

  initGrid() {
    console.log(this);

    const columns: any[] = this.fields.map((item) => {
      return {
        ...item,
        field: item.id,
        title: item.formItemProps.label,
        slots: {
          header: (data: any) => {
            return h(RenderTableHeader, { data });
          },
        },
        visible: true, // 默认显示所有列
      };
    });
    columns.unshift({
      type: "checkbox",
      width: 60,
    });
    if (this.toolbar.inlineButtons.length > 0) {
      columns.push({
        isTable: true,
        field: "actions", // 给操作列一个field标识
        label: "操作",
        showOverflow: false,
        visible: true, // 操作列默认显示
        slots: {
          default: (rowData) => {
            return h(RenderOperatorColumn, { tjTable: this, rowData });
          },
        },
        width: "300px",
      });
    }

    this.grid = {
      height: "auto",
      minHeight: "300px",
      columns, // 使用可见的列
      cellConfig: {},
      headerCellConfig: {
        padding: false,
      },
      showHeaderOverflow: "ellipsis",
      checkboxConfig: {
        trigger: "row",
      },
      data: [],

      onCheckboxChange: () => this.grid.getOids(),
      onCheckboxAll: () => this.grid.getOids(),
      onCellClick: (e) => {
        e.$event.stopPropagation();
      },
      getOids: () => {
        const arr = unref(this.gridRef).getCheckboxRecords();
        this.oids = arr.map((item: any) => item._id);
      },
    };
  }

  /**
   * 获取表格数据
   */
  async loadData(): Promise<void> {
    if (!this.menuId) {
      console.warn("menuId is required for dataLoading data");
      return;
    }

    try {
      this.dataLoading = true;
      const response = await api.form.list(this.menuId);
      const data = response as any; // 临时处理类型

      // 根据您的 API 返回结构调整
      this.grid.data = data.data;
      this.pagination.total = data.total;
    } catch (error) {
      console.error("Failed to load table data:", error);
      this.grid.data = [];
      this.pagination.total = 0;
    } finally {
      this.dataLoading = false;
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
   * 全屏切换
   */
  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
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
