import { createButton } from "./button.tsx";

export function createRemoveButton(tjTable) {
  const button = createButton();
  button.props.label = "批量删除";
  console.log("执行了吗", tjTable);

  button.props.disabled = computed(() => {
    console.log("这执行里面啊", tjTable);
    return tjTable.oids.length === 0;
  });
  button.props.onClick = (item) => {
    console.log("获取到了", item, tjTable);
  };
  return button;
}
