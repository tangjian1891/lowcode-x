import { TjInput, TjInputDesign } from "./tj-input";

const materialList = [{ type: MaterialEnum.TjInput, label: "单行文本", class: TjInput, id: nanoid() }];

const designComponentMap = {
  [MaterialEnum.TjInput]: TjInputDesign,
};

export { materialList, designComponentMap };
