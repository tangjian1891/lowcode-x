import { nanoid } from "nanoid";
import { MaterialEnum } from "../input/app-input.model";

export class AppSelect {
  id = nanoid();
  type = MaterialEnum.AppSelect;
  label = "单选下拉";
  icon = "Select";

  fieldProps = {
    modelValue: "",
    placeholder: "请选择",
    clearable: true,
    disabled: false,
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
    ],
  };

  constructor() {
    this.id = nanoid();
  }
}

export class AppMultiSelect extends AppSelect {
  type = MaterialEnum.AppMultiSelect;
  label = "多选下拉";

  constructor() {
    super();
    (this.fieldProps as any).modelValue = [];
    (this.fieldProps as any).multiple = true;
  }
}
