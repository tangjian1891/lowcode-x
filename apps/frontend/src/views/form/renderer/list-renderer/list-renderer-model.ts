import { api } from "@/api";
import { reactive } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import { ElMessage, ElMessageBox } from "element-plus";

interface ListRendererParams {
  fields?: any[];
  menuId?: string;
  data?: any[];
}

class Reactive {
  constructor() {
    return reactive(this);
  }
}

/**
 * 列表渲染器模型 (包含表格配置、工具栏、分页等逻辑)
 */
export class ListRendererModel extends Reactive {
  fields: any[] = [];
  data: any[] = [];
  dataLoading = false;
  menuId: string | null = null;
  grid: VxeGridProps = {};
  gridRef: VxeGridInstance | null = null;
  pagination = {
    pageSize: 50,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    currentPage: 1,
  };

  constructor(params: ListRendererParams = {}) {
    super();
    this.fields = params.fields || [];
    this.menuId = params.menuId || null;
    this.data = params.data || [];
  }

  /**
   * 初始化列表/表格配置
   */
  init(fields: any) {
    console.log("Initializing List Renderer with fields:", fields);

    const columns: any[] = fields.map((field: any) => {
      return {
        ...field,
        field: field.id,
        title: field.formItemProps?.label || field.label,
        visible: true,
      };
    });

    // Add checkbox column
    columns.unshift({
      type: "checkbox",
      width: 50,
      fixed: "left",
    });

    this.grid = {
      height: "auto",
      columns,
      showHeaderOverflow: "ellipsis",
      data: this.data,
    };
  }

  /**
   * 加载数据
   */
  async loadData(): Promise<void> {
    if (!this.menuId) return;

    try {
      this.dataLoading = true;
      const response = await api.formData.list(this.menuId);
      const data = response as any;

      this.grid.data = data.list;
      this.pagination.total = data.total;
    } catch (error) {
      console.error("Failed to load list data:", error);
      this.grid.data = [];
      this.pagination.total = 0;
    } finally {
      this.dataLoading = false;
    }
  }

  async refresh(): Promise<void> {
    await this.loadData();
  }

  async handlePageChange(page: number): Promise<void> {
    this.pagination.currentPage = page;
    await this.loadData();
  }

  async handlePageSizeChange(pageSize: number): Promise<void> {
    this.pagination.pageSize = pageSize;
    this.pagination.currentPage = 1;
    await this.loadData();
  }

  async handleDelete() {
    if (!this.gridRef) {
      console.warn("Grid reference is not ready.");
      return;
    }

    const selectedRecords = this.gridRef.getCheckboxRecords();
    if (selectedRecords.length === 0) {
      ElMessage.warning("请选择要删除的数据");
      return;
    }

    try {
      await ElMessageBox.confirm("确定要删除选中的数据吗？", "提示", {
        type: "warning",
      });

      const ids = selectedRecords.map((item: any) => item.id);
      await api.formData.remove(ids);
      ElMessage.success("删除成功");
      this.refresh();
    } catch (error) {
      // Cancelled or failed
      if (error !== "cancel") {
        console.error("Delete failed:", error);
      }
    }
  }
}
