import { AppInput, AppTextarea, AppInputView } from "./input";
import { AppNumber, AppNumberView } from "./number";
import { AppDatetime, AppDatetimeView } from "./datetime";
import { AppSelect, AppMultiSelect, AppSelectView } from "./select";
import { AppUploadImage, AppUploadFile, AppUploadView } from "./upload";
import { AppCollapse, AppCollapseView } from "./collapse";

export * from "./input";
export * from "./number";
export * from "./datetime";
export * from "./select";
export * from "./upload";
export * from "./collapse";

export const materialList = [
  {
    group: "输入组件",
    items: [
      { type: "AppInput", label: "单行文本", icon: "Document", class: AppInput },
      { type: "AppTextarea", label: "多行文本", icon: "Tickets", class: AppTextarea },
      { type: "AppNumber", label: "数字", icon: "Memo", class: AppNumber },
      { type: "AppDatetime", label: "日期时间", icon: "Calendar", class: AppDatetime },
      { type: "AppSelect", label: "下拉单选", icon: "Select", class: AppSelect },
      { type: "AppMultiSelect", label: "下拉多选", icon: "Select", class: AppMultiSelect },
      { type: "AppUploadImage", label: "图片上传", icon: "Picture", class: AppUploadImage },
      { type: "AppUploadFile", label: "文件上传", icon: "Files", class: AppUploadFile },
    ],
  },
  { group: "布局组件", items: [{ type: "AppCollapse", label: "折叠面板", icon: "Memo", class: AppCollapse }] },
];

export const materialComponentMap: Record<string, any> = {
  AppInput: AppInputView,
  AppTextarea: AppInputView,
  AppNumber: AppNumberView,
  AppDatetime: AppDatetimeView,
  AppSelect: AppSelectView,
  AppMultiSelect: AppSelectView,
  AppUploadImage: AppUploadView,
  AppUploadFile: AppUploadView,
  AppCollapse: AppCollapseView,
};
