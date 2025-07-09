import { createDialog } from "@/tj-dialog/index.ts";
import { createButton } from "./button.tsx";
import JasForm from "@/design/jas-form.vue";
import { ElMessage } from "element-plus";

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
        event.stopPropagation();

        const dialog = createDialog(JasForm, {
          formId: tjTable.menuId,
          tjTable,
          id: rowData.row._id,
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
      button.props.onClick = async (event: Event, rowData: any) => {
        event.stopPropagation();
        console.log("获取到了", tjTable);
        let res = await api.form.removeById(tjTable.menuId, rowData.row._id);
        ElMessage.success("删除成功");
        await tjTable.loadData();
        console.log(res);
      };
      return button;
    },
  };
}
