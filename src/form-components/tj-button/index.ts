import TjButton, { type ITjButton } from "./tj-button";
import { createAddButton } from "./add-button";
import { createEditButton } from "./inline-edit-button";
import { createInlineDeleteButton } from "./inline-delete-button";
import { createBatchDeleteButton } from "./delete-button";
import { createExportButton } from "./export-button";
import { createImportButton } from "./import-button";

// 导出所有按钮类型和创建函数
export {
  TjButton,
  type ITjButton,
  createAddButton,
  createEditButton,
  createInlineDeleteButton,
  createBatchDeleteButton,
  createExportButton,
  createImportButton,
};

// 导出一个方便使用的对象，包含所有按钮
export const Button = {
  TjButton,
  createAddButton,
  createEditButton,
  createInlineDeleteButton,
  createBatchDeleteButton,
  createExportButton,
  createImportButton,
};

export default TjButton;
