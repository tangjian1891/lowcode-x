import { nanoid } from "nanoid";
import { MaterialEnum } from "../input/app-input.model";

export class AppDatetime {
  id = nanoid();
  type = MaterialEnum.AppDatetime;
  label = "日期时间";
  icon = "Calendar";

  fieldProps = {
    modelValue: "",
    type: "datetime",
    placeholder: "请选择日期时间",
    clearable: true,
    disabled: false,
    format: "YYYY-MM-DD HH:mm:ss",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  };

  constructor() {
    this.id = nanoid();
  }
}
