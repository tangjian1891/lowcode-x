import { nanoid } from "nanoid";
import { MaterialEnum } from "../input/app-input.model";

export class AppUploadImage {
  id = nanoid();
  type = MaterialEnum.AppUploadImage;
  label = "图片上传";
  icon = "Picture";

  fieldProps = {
    modelValue: [],
    action: "/api/upload",
    limit: 1,
    multiple: false,
    listType: "picture-card",
    disabled: false,
  };

  constructor() {
    this.id = nanoid();
  }
}

export class AppUploadFile extends AppUploadImage {
  type = MaterialEnum.AppUploadFile;
  label = "文件上传";
  icon = "Files";

  constructor() {
    super();
    this.fieldProps.listType = "text";
  }
}
