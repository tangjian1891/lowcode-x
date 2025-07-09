import { createDialog } from "@/tj-dialog/index.ts";
import { createButton } from "./button.tsx";
import JasForm from "@/design/jas-form.vue";

export function createInlineButtonFactory(tjTable) {
  return {
    detail() {
      const button = createButton();
      button.props.label = "详情";
      button.props.text = true;
      button.props.onClick = (event: Event) => {
        console.log("获取到了详情", tjTable);
        event.stopPropagation();
      };
      return button;
    },
    edit() {
      const button = createButton();
      button.props.label = "编辑";
      button.props.text = true;
      button.props.onClick = (event: Event, rowData) => {
        console.log("获取到了", event, rowData, tjTable);
        event.stopPropagation();

        const dialog = createDialog(JasForm, {
          formId: tjTable.menuId,
          tjTable,
          close() {
            dialog.close();
          },
        });
      };
      return button;
    },
    delete() {
      const button = createButton();
      button.props.label = "删除";
      button.props.text = true;
      button.props.onClick = (event: Event) => {
        console.log("获取到了", tjTable);
        event.stopPropagation();
      };
      return button;
    },
  };
}
