import { nanoid } from "nanoid";
import { MaterialType } from "../types";

export class AppUploadImage {
  id = nanoid();
  type = MaterialType.AppUploadImage;
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
  type = MaterialType.AppUploadFile;
  label = "文件上传";
  icon = "Files";

  constructor() {
    super();
    this.fieldProps.listType = "text";
  }
}
