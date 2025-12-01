import { createDialog, TjDialog } from "@/tj-dialog/index.ts";
import { createButton } from "./button.tsx";
import JasForm from "@/design/jas-form.vue";
export function createToolbarButtonFactory(tjTable) {
  return {
    add() {
      const button = createButton();
      button.props.label = "新增";
      button.props.onClick = () => {
        const dialog = new TjDialog(JasForm, { formId: tjTable.menuId });
        dialog.open();
        dialog.onRefresh = () => {
          tjTable.refresh();
        };
      };
      return button;
    },
    remove() {
      const button = createButton();
      button.props.label = "批量删除";

      button.props.disabled = computed(() => {
        return tjTable.oids.length === 0;
      });
      button.props.onClick = (item) => {
        console.log("获取到了", item, tjTable);
      };
      return button;
    },
  };
}
