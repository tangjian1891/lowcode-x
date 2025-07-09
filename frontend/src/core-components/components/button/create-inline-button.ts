import { createButton } from "./button.tsx";

export function createInlineButtonFactory(tjTable) {
  return {
    detail() {
      const button = createButton();
      button.props.label = "详情";
      button.props.text = true;
      button.props.onClick = (item) => {
        console.log("获取到了详情", item, tjTable);
      };
      return button;
    },
    edit() {
      const button = createButton();
      button.props.label = "编辑";
      button.props.text = true;
      button.props.onClick = (item) => {
        console.log("获取到了", item, tjTable);
      };
      return button;
    },
    delete() {
      const button = createButton();
      button.props.label = "删除";
      button.props.text = true;
      button.props.onClick = (item) => {
        console.log("获取到了", item, tjTable);
      };
      return button;
    },
  };
}
