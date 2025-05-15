import TjButton, { type ITjButton, ButtonEnableCondition } from "./tj-button";
import type { ITjTable } from "@/core-components/tj-table/tj-table";
import { ElMessageBox } from "element-plus";
import { Permission } from "@/utils/permissions";

/**
 * 创建批量删除按钮
 * @param label 按钮文本
 * @param params 按钮参数
 */
export function createBatchDeleteButton(label = "批量删除") {
  const button = new TjButton({
    label,
    type: "danger",
    permission: Permission.DELETE, // 默认使用通用删除权限
    enableCondition: ButtonEnableCondition.ONE_ROW_SELECTED, // 至少选择一行才可用
  });

  button.onClick = (button: ITjButton, tjTable: ITjTable) => {
    // 检查是否有选中的记录
    const selectedRows = tjTable.grid?.selectedRows || [];
    if (selectedRows.length === 0) {
      ElMessageBox.alert("请先选择要删除的记录", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      });
      return;
    }

    ElMessageBox.confirm(`确认删除选中的 ${selectedRows.length} 条记录吗？`, "批量删除确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        // 执行批量删除操作
        if (tjTable.onBatchDelete) {
          tjTable.onBatchDelete(selectedRows);
        }
      })
      .catch(() => {
        // 取消操作
      });
  };

  return button;
}

export default createBatchDeleteButton;
