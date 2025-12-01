import { MaterialEnum, FieldWidthEnum, ValueEnum } from "@/enums";

export class TjCollapse {
  type = MaterialEnum.TjCollapse;
  label = "折叠面板";
  children = [];
  valueProps = {
    type: ValueEnum.Default,
    value: [], // 默认激活的面板
  };
  authProps = {
    visible: true,
    enabled: true,
  };
  validateProps = {
    required: false,
    unique: false,
  };
  layoutProps = {
    type: FieldWidthEnum.FixedPercentage,
    value: 24,
  };
  formItemProps = {
    label: "折叠面板",
    description: "", // 描述文本
  };
  enabledProps = {
    label: true,
    description: false,
  };
}
