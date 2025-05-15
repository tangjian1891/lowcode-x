import TjButton, { ButtonEnableCondition, type ITjButton } from "./tj-button";
import type { ITjTable } from "@/core-components/tj-table/tj-table";
import { createDialog } from "@/tj-dialog/index";
import JasForm from "@/core-components/tj-form/index.vue";
import { Permission } from "@/utils/permissions";

/**
 * 创建编辑按钮
 * @param label 按钮文本
 * @param params 按钮参数
 */
export function createEditButton(label = "编辑") {
  const button = new TjButton({
    label,
    type: "primary",
    permission: Permission.EDIT, // 默认使用通用编辑权限
    enableCondition: ButtonEnableCondition.ALWAYS,
  });

  button.onClick = (button: ITjButton, tjTable: ITjTable) => {
    createDialog(tjTable, JasForm);
  };

  return button;
}

export default createEditButton;
