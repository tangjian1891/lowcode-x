import { TjCollapse } from "./tj-collapse";
import TjCollapseDesign from "./tj-collapse/tj-collapse-design.vue";
import { TjDatetime } from "./tj-datetime/tj-datetime";
import TjDatetimeDesign from "./tj-datetime/tj-datetime-design.vue";
import { TjInput, TjTextarea, TjInputDesign } from "./tj-input";
import { TjNumber } from "./tj-number";
import { TjMultiSelect, TjSelect } from "./tj-select";
import TjSelectDesign from "./tj-select/tj-select-design.vue";

// 定义字段类型
interface FieldType {
  type: string;
  [key: string]: any;
}

// 定义元素类型
export interface MaterialElement {
  class: new () => FieldType;
  label: string;
  type: string;
  [key: string]: any;
}

const materialList: MaterialElement[] = [
  { type: MaterialEnum.TjInput, label: "单行文本", class: TjInput, id: nanoid() },
  { type: MaterialEnum.TjTextarea, label: "多行文本", class: TjTextarea, id: nanoid() },
  { type: MaterialEnum.TjNumber, label: "数字", class: TjNumber, id: nanoid() },
  { type: MaterialEnum.TjDatetime, label: "日期时间", class: TjDatetime, id: nanoid() },
  { type: MaterialEnum.TjSelect, label: "下拉单选", class: TjSelect, id: nanoid() },
  { type: MaterialEnum.TjMultiSelect, label: "下拉多选", class: TjMultiSelect, id: nanoid() },
  { type: MaterialEnum.TjCollapse, label: "折叠面板", class: TjCollapse, id: nanoid() },
];

const designComponentMap = {
  [MaterialEnum.TjInput]: TjInputDesign,
  [MaterialEnum.TjTextarea]: TjInputDesign,
  [MaterialEnum.TjNumber]: TjInputDesign,
  [MaterialEnum.TjDatetime]: TjDatetimeDesign,
  [MaterialEnum.TjSelect]: TjSelectDesign,
  [MaterialEnum.TjMultiSelect]: TjSelectDesign,
  [MaterialEnum.TjCollapse]: TjCollapseDesign,
};

export { materialList, designComponentMap };
