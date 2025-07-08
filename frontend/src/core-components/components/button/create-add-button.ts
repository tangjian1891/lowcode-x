import { createDialog } from "@/tj-dialog/index.ts";
import { createButton } from "./button.tsx";
import JasForm from "@/design/jas-form.vue";

export function createAddButton(tjTable) {
  const button = createButton();
  button.props.label = "新增";
  button.props.onClick = () => {
    const dialog = createDialog(JasForm, {
      formId: tjTable.menuId,
      tjTable,
      close() {
        dialog.close();
      },
    });
  };
  return button;
}
