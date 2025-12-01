import TjButton, { type ITjButton } from "./tj-button";
import type { ITjTable } from "@/core-components/tj-table/tj-table";
import { Permission } from "@/utils/permissions";

/**
 * 创建导出按钮
 * @param label 按钮文本
 * @param params 按钮参数
 */
export function createExportButton(label = "导出", params: Partial<ITjButton> = {}) {
  const button = new TjButton({
    label,
    type: "primary",
    permission: Permission.EXPORT, // 默认使用通用导出权限
    ...params,
  });

  button.onClick = (button: ITjButton, tjTable: ITjTable) => {
    if (tjTable.onExport) {
      tjTable.onExport();
    } else {
      console.log("导出功能尚未实现");
    }
  };

  return button;
}

export default createExportButton;
