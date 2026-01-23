import { nanoid } from "nanoid";
import { MaterialType } from "../types";

export class AppDatetime {
  id = nanoid();
  type = MaterialType.AppDatetime;
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
