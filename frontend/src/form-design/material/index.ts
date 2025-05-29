import { TjInput, TjTextarea, TjInputDesign } from "./tj-input";

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
];

const designComponentMap = {
  [MaterialEnum.TjInput]: TjInputDesign,
  [MaterialEnum.TjTextarea]: TjInputDesign,
};

export { materialList, designComponentMap };
