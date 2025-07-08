import { ElButton } from "element-plus";

const TjButton = {
  name: "TjButton",
  props: ["item"],
  render() {
    return <ElButton {...this.item.props}>{this.item.props.label}</ElButton>;
  },
};

export function createButton() {
  return {
    props: {
      type: "primary",
      label: "按钮",
    },
    component: markRaw(TjButton),
  };
}
