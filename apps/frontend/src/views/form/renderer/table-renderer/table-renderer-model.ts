import { api } from "@/api";
import type { VxeGridProps } from "vxe-table";

interface TableRendererParams {
  fields?: any[];
  menuId?: string;
  data?: any[];
}

class Reactive {
  constructor() {
    return reactive(this);
  }
}

export class TableRendererModel extends Reactive {
  fields: any[] = [];
  data: any[] = [];
  dataLoading = false;
  menuId: string | null = null;
  grid: VxeGridProps = {};
  gridRef = null;
  pagination = {
    pageSize: 50,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    currentPage: 1,
  };

  constructor(params: TableRendererParams = {}) {
    super();
    this.fields = params.fields || [];
    this.menuId = params.menuId || null;
    this.data = params.data || [];
  }

  /**
   * 初始化表格配置
   */
  init(fields: any) {
    console.log("看下", fields);

    const columns: any[] = fields.map((field) => {
      return {
        ...field,
        field: field.id,
        title: field.formItemProps?.label || field.label,
        visible: true,
      };
    });

    this.grid = {
      height: "auto",
      // minHeight: "300px",
      columns,
      showHeaderOverflow: "ellipsis",
      data: this.data,
    };
  }

  /**
   * 加载表格数据
   */
  async loadData(): Promise<void> {
    if (!this.menuId) {
      console.warn("menuId is required for loading data");
      return;
    }

    try {
      this.dataLoading = true;
      const response = await api.form.list(this.menuId);
      const data = response as any;

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
   * 分页改变
   */
  async handlePageChange(page: number): Promise<void> {
    this.pagination.currentPage = page;
    await this.loadData();
  }

  /**
   * 页大小改变
   */
  async handlePageSizeChange(pageSize: number): Promise<void> {
    this.pagination.pageSize = pageSize;
    this.pagination.currentPage = 1;
    await this.loadData();
  }
}
