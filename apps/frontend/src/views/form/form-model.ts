import { ref, reactive, computed } from "vue";
import { cloneDeep, keyBy } from "lodash-es";
import { nanoid } from "nanoid";
import {
  AppInput,
  AppInputView,
  AppTextarea,
  AppNumber,
  AppNumberView,
  AppDatetime,
  AppDatetimeView,
  AppSelect,
  AppMultiSelect,
  AppSelectView,
  AppUploadImage,
  AppUploadFile,
  AppUploadView,
  AppCollapse,
  AppCollapseView,
  MaterialType,
} from "./materials";

export const materialList: any[] = [
  {
    group: "输入组件",
    items: [
      { type: MaterialType.AppInput, label: "单行文本", icon: "Document", model: AppInput, component: AppInputView },
      { type: MaterialType.AppTextarea, label: "多行文本", icon: "Tickets", model: AppTextarea, component: AppInputView },
      { type: MaterialType.AppNumber, label: "数字", icon: "Memo", model: AppNumber, component: AppNumberView },
      { type: MaterialType.AppDatetime, label: "日期时间", icon: "Calendar", model: AppDatetime, component: AppDatetimeView },
      { type: MaterialType.AppSelect, label: "下拉单选", icon: "Select", model: AppSelect, component: AppSelectView },
      { type: MaterialType.AppMultiSelect, label: "下拉多选", icon: "Select", model: AppMultiSelect, component: AppSelectView },
      { type: MaterialType.AppUploadImage, label: "图片上传", icon: "Picture", model: AppUploadImage, component: AppUploadView },
      { type: MaterialType.AppUploadFile, label: "文件上传", icon: "Files", model: AppUploadFile, component: AppUploadView },
    ],
  },
  {
    group: "布局组件",
    items: [{ type: MaterialType.AppCollapse, label: "折叠面板", icon: "Memo", model: AppCollapse, component: AppCollapseView }],
  },
];

// 扁平化所有 items 以便生成 mapping
const allMaterials = materialList.flatMap((group) => group.items);
export const materialMap = keyBy(allMaterials, "type");

// 定义字段类型
export interface FieldType {
  id: string;
  type: string;
  label: string;
  name?: string;
  attrs?: any;
  [key: string]: any;
}

// 定义表单配置接口
// 定义表单配置接口
export interface FormConfig {
  fields: FieldType[];
  config: {
    labelWidth: string;
    labelPosition: string;
    size: string;
  };
}
export class ReactiveBase {
  constructor() {
    return reactive(this);
  }
}

/**
 * 基础视图模型：包含渲染、呈现所需的核心数据和逻辑
 */
export class FormViewModel extends ReactiveBase {
  static readonly MaterialType = MaterialType;

  public fields: FieldType[] = [];
  public config = {
    labelWidth: "120px",
    labelPosition: "right",
    size: "default",
  };

  constructor(initialData?: Partial<FormConfig>) {
    super();
    if (initialData) {
      Object.assign(this, initialData);
    }
  }

  public loadData(initialData: Partial<FormConfig>) {
    Object.assign(this, initialData);
  }

  public get fieldMapping() {
    return keyBy(this.fields, "id") as Record<string, FieldType>;
  }

  // 表单数据
  public formData: Record<string, any> = {};

  public setFormData(data: Record<string, any>) {
    this.formData = data;
  }
}

/**
 * 设计器视图模型：在基础模型之上，增加设计时特有的逻辑
 */
export class FormDesignerViewModel extends FormViewModel {
  // 基础数据
  public materialList = markRaw(materialList);
  public materialMap = markRaw(materialMap);

  // 虚拟一个占位 ID 用作“未选中”或“表单设置”状态
  public readonly EMPTY_ID = "__EMPTY_FORM__";

  public activeId = this.EMPTY_ID;

  constructor() {
    super();
  }

  // 移除 setMaterials，因为现在直接从常量引用

  // 获取当前激活的字段
  public get activeField() {
    return this.fieldMapping[this.activeId] || null;
  }

  // 克隆元素
  public onClone(element: any) {
    return new element.model();
  }

  // 添加字段到设计区域
  public addFieldByClick(element: any) {
    const field = this.onClone(element);
    this.addField2Design(field);
  }

  // 添加字段到设计区域
  public addField2Design(field: any) {
    const newField = cloneDeep(field) as FieldType;
    this.fields.push(newField);
    this.clickField(newField);
  }

  // 高亮选中字段
  public clickField(field: { id: string } | null) {
    this.activeId = field ? field.id : this.EMPTY_ID;
  }

  // 删除元素
  public deleteField(field: any) {
    const idx = this.fields.findIndex((f) => f.id === field.id);
    if (idx > -1) {
      this.fields.splice(idx, 1);

      this.clickField(null);
    }
  }

  // 复制元素
  public copyField(field: any) {
    const element = this.materialMap[field.type];
    if (element) {
      const newField = this.onClone(element) as any;
      Object.assign(newField, cloneDeep(field));
      newField.id = nanoid(); // 确保 ID 唯一
      this.fields.push(newField);
      this.clickField(newField);
    }
  }

  // 清空表单
  public clearForm() {
    this.fields = [];
    this.clickField(null);
  }
}
