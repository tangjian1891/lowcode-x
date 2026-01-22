import { nanoid } from "nanoid";
import { MaterialEnum } from "../input/app-input.model";

export class AppNumber {
  id = nanoid();
  type = MaterialEnum.AppNumber;
  label = "数字";
  icon = "Memo";

  fieldProps = {
    modelValue: 0,
    placeholder: "请输入数字",
    clearable: false,
    disabled: false,
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined,
  };

  constructor() {
    this.id = nanoid();
  }
}
