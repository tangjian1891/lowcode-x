import { nanoid } from "nanoid";

import { MaterialType } from "../types";

export class AppInput {
  id = nanoid();
  type = MaterialType.AppInput;
  label = "单行文本";
  icon = "Document";

  fieldProps = {
    type: "text",
    placeholder: "请输入",
    clearable: false,
    disabled: false,
    readonly: false,
    maxlength: undefined,
    showWordLimit: false,
  };

  constructor() {
    this.id = nanoid();
  }
}

export class AppTextarea extends AppInput {
  type = MaterialType.AppTextarea;
  label = "多行文本";
  icon = "Tickets";

  constructor() {
    super();
    this.fieldProps.type = "textarea";
  }
}
