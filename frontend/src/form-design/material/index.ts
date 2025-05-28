import { TjInput, TjTextarea, TjInputDesign } from "./tj-input";

const materialList = [
  { type: MaterialEnum.TjInput, label: "单行文本", class: TjInput, id: nanoid() },
  { type: MaterialEnum.TjTextarea, label: "多行文本", class: TjTextarea, id: nanoid() },
];

const designComponentMap = {
  [MaterialEnum.TjInput]: TjInputDesign,
  [MaterialEnum.TjTextarea]: TjInputDesign,
};

export { materialList, designComponentMap };
