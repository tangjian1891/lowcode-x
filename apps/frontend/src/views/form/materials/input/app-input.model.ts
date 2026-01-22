import { nanoid } from "nanoid";

export enum MaterialEnum {
  AppInput = "AppInput",
  AppTextarea = "AppTextarea",
  AppNumber = "AppNumber",
  AppDatetime = "AppDatetime",
  AppSelect = "AppSelect",
  AppMultiSelect = "AppMultiSelect",
  AppUploadImage = "AppUploadImage",
  AppUploadFile = "AppUploadFile",
  AppCollapse = "AppCollapse",
}

export class AppInput {
  id = nanoid();
  type = MaterialEnum.AppInput;
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
  type = MaterialEnum.AppTextarea;
  label = "多行文本";
  icon = "Tickets";

  constructor() {
    super();
    this.fieldProps.type = "textarea";
  }
}
