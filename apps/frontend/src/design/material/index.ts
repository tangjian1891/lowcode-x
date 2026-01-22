import { TjCollapse } from "./tj-collapse";
import TjCollapseDesign from "./tj-collapse/tj-collapse-design.vue";
import { TjCollapseRuntime } from "./tj-collapse";
import { TjDatetime } from "./tj-datetime/tj-datetime";
import TjDatetimeDesign from "./tj-datetime/tj-datetime-design.vue";
import { TjDatetimeRuntime } from "./tj-datetime";
import { TjInput, TjTextarea, TjInputDesign, TjInputRuntime } from "./tj-input";
import { TjNumber } from "./tj-number";
import { TjNumberRuntime } from "./tj-number";
import { TjMultiSelect, TjSelect } from "./tj-select";
import TjSelectDesign from "./tj-select/tj-select-design.vue";
import { TjSelectRuntime } from "./tj-select";
import { TjUploadFile, TjUploadImage } from "./tj-upload/tj-upload";
import TjUploadRuntime from "./tj-upload/tj-upload-runtime.vue";
import TjUploadDesign from "./tj-upload/tj-upload-design.vue";

// 定义字段类型
interface FieldType {
  type: string;
  [key: string]: any;
}

// 定义元素类型
export interface MaterialElement {
  class: new () => FieldType;
  label: string;
  type: string;
  [key: string]: any;
}

const materialList: MaterialElement[] = [
  { type: MaterialEnum.TjInput, label: "单行文本", class: TjInput, id: nanoid() },
  { type: MaterialEnum.TjTextarea, label: "多行文本", class: TjTextarea, id: nanoid() },
  { type: MaterialEnum.TjNumber, label: "数字", class: TjNumber, id: nanoid() },
  { type: MaterialEnum.TjDatetime, label: "日期时间", class: TjDatetime, id: nanoid() },
  { type: MaterialEnum.TjSelect, label: "下拉单选", class: TjSelect, id: nanoid() },
  { type: MaterialEnum.TjMultiSelect, label: "下拉多选", class: TjMultiSelect, id: nanoid() },
  // { type: MaterialEnum.TjCollapse, label: "折叠面板", class: TjCollapse, id: nanoid() },
  { type: MaterialEnum.TjUploadImage, label: "图片上传", class: TjUploadImage, id: nanoid() },
  { type: MaterialEnum.TjUploadFile, label: "文件上传", class: TjUploadFile, id: nanoid() },
];

const designComponentMap = {
  [MaterialEnum.TjInput]: TjInputDesign,
  [MaterialEnum.TjTextarea]: TjInputDesign,
  [MaterialEnum.TjNumber]: TjInputDesign,
  [MaterialEnum.TjDatetime]: TjDatetimeDesign,
  [MaterialEnum.TjSelect]: TjSelectDesign,
  [MaterialEnum.TjMultiSelect]: TjSelectDesign,
  [MaterialEnum.TjCollapse]: TjCollapseDesign,
  [MaterialEnum.TjUploadImage]: TjUploadDesign,
  [MaterialEnum.TjUploadFile]: TjUploadDesign,
};

const runtimeComponentMap = {
  [MaterialEnum.TjInput]: TjInputRuntime,
  [MaterialEnum.TjTextarea]: TjInputRuntime,
  [MaterialEnum.TjNumber]: TjNumberRuntime,
  [MaterialEnum.TjDatetime]: TjDatetimeRuntime,
  [MaterialEnum.TjSelect]: TjSelectRuntime,
  [MaterialEnum.TjMultiSelect]: TjSelectRuntime,
  [MaterialEnum.TjCollapse]: TjCollapseRuntime,
  [MaterialEnum.TjUploadImage]: TjUploadRuntime,
  [MaterialEnum.TjUploadFile]: TjUploadRuntime,
};

export { materialList, designComponentMap, runtimeComponentMap };
