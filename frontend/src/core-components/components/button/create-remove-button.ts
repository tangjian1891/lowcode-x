import { createButton } from "./button.tsx";

export function createRemoveButton(tjTable) {
  const button = createButton();
  button.props.label = "批量删除";
  button.props.disabled = computed(() => {
    return true;
  });
  button.props.onClick = (item) => {
    console.log("获取到了", item, tjTable);
  };
  return button;
}
