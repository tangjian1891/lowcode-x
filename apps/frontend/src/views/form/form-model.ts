import { ref, reactive, computed } from "vue";
import { cloneDeep, keyBy } from "lodash-es";
import { nanoid } from "nanoid";

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
export interface FormConfig {
  fields: FieldType[];
  formTree: any[];
  formProps: {
    labelWidth: string;
    labelPosition: string;
    size: string;
  };
}

/**
 * 基础视图模型：包含渲染、呈现所需的核心数据和逻辑
 */
export class FormViewModel {
  public state = reactive<FormConfig>({
    fields: [],
    formTree: [],
    formProps: {
      labelWidth: "120px",
      labelPosition: "right",
      size: "default",
    },
  });

  constructor(initialData?: Partial<FormConfig>) {
    if (initialData) {
      Object.assign(this.state, initialData);
    }
  }

  public get fieldMapping() {
    return keyBy(this.state.fields, "id") as Record<string, FieldType>;
  }

  // 加载数据
  public loadConfig(config: FormConfig) {
    this.state.fields = config.fields || [];
    this.state.formTree = config.formTree || [];
    this.state.formProps = config.formProps || {
      labelWidth: "120px",
      labelPosition: "right",
      size: "default",
    };
  }
}

/**
 * 设计器视图模型：在基础模型之上，增加设计时特有的逻辑
 */
export class FormDesignerViewModel extends FormViewModel {
  // 移除对 materialList 的直接引用
  private materialMap: Record<string, any> = {};
  public materialList: any[] = [];

  // 虚拟一个占位 ID 用作“未选中”或“表单设置”状态
  public readonly EMPTY_ID = "__EMPTY_FORM__";

  public activeId = ref(this.EMPTY_ID);

  constructor(initialData?: Partial<FormConfig>) {
    super(initialData);
    this.activeId.value = this.EMPTY_ID;
  }

  // 设置组件列表（从外部注入，避免循环引用）
  public setMaterials(materials: any[]) {
    this.materialList = materials;
    this.materialMap = keyBy(materials, "type");
  }

  // 获取当前激活的字段
  public get activeField() {
    return this.fieldMapping[this.activeId.value] || null;
  }

  // 克隆元素
  public onClone(element: any) {
    return new element.class();
  }

  // 添加字段到设计区域
  public addFieldByClick(element: any) {
    const field = this.onClone(element);
    this.addField2Design(field);
  }

  // 添加字段到设计区域
  public addField2Design(field: any) {
    const newField = cloneDeep(field) as FieldType;
    this.state.fields.push(newField);
    this.state.formTree.push({ id: newField.id });
    this.clickField(newField);
  }

  // 高亮选中字段
  public clickField(field: { id: string } | null) {
    this.activeId.value = field ? field.id : this.EMPTY_ID;
  }

  // 删除元素
  public deleteField(field: any) {
    const idx = this.state.fields.findIndex((f) => f.id === field.id);
    if (idx > -1) {
      this.state.fields.splice(idx, 1);

      const treeIdx = this.state.formTree.findIndex((item) => item.id === field.id);
      if (treeIdx > -1) {
        this.state.formTree.splice(treeIdx, 1);
      }

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
      this.state.fields.push(newField);
      this.state.formTree.push({ id: newField.id });
      this.clickField(newField);
    }
  }

  // 清空表单
  public clearForm() {
    this.state.fields = [];
    this.state.formTree = [];
    this.clickField(null);
  }
}
