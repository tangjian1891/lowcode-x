import { MaterialEnum, FieldWidthEnum, DateTimeEnum, ValueEnum } from "@/enums";

export class TjDatetime {
  type = MaterialEnum.TjDatetime;
  label = "日期时间";
  fieldProps = {
    // el-date-picker 基本属性
    type: "datetime", // 日期时间类型
    modelValue: "", // 绑定值
    placeholder: "请选择日期时间", // 输入框占位文本
    format: DateTimeEnum.YYYY_MM_DD, // 显示在输入框中的格式
    valueFormat: DateTimeEnum.YYYY_MM_DD, // 绑定值的格式
    disabledDate: undefined, // 禁用日期的函数
    shortcuts: [], // 快捷选项
    clearable: true, // 是否显示清除按钮
    disabled: false, // 是否禁用
    size: "default", // 输入框尺寸
    readonly: false, // 是否只读
    editable: true, // 文本框可输入
    prefixIcon: "", // 自定义前缀图标
    clearIcon: "", // 自定义清空图标
    validateEvent: true, // 是否触发表单验证
    rangeSeparator: "-", // 选择范围时的分隔符，只对范围选择有效
    startPlaceholder: "开始日期", // 范围选择时开始日期的占位内容
    endPlaceholder: "结束日期", // 范围选择时结束日期的占位内容
    defaultValue: null, // 可选，选择器打开时默认显示的时间
    defaultTime: null, // 范围选择时选中日期所使用的当日内具体时刻
  };
  valueProps = {
    type: ValueEnum.Default,
    value: "", // 默认值
  };
  authProps = {
    visible: true,
    enabled: true,
  };
  validateProps = {
    required: false,
    unique: false,
  };
  layoutProps = {
    type: FieldWidthEnum.FixedPercentage,
    value: 24,
  };
  formItemProps = {
    label: "日期时间",
    description: "", // 描述文本
  };
  enabledProps = {
    label: true,
    description: false,
    showFormat: true, // 是否显示格式设置
  };
}

// 年份选择器
export class TjYear extends TjDatetime {
  constructor() {
    super();
    this.label = "年份选择";
    this.fieldProps.type = "year";
    this.fieldProps.format = DateTimeEnum.YYYY;
    this.fieldProps.valueFormat = DateTimeEnum.YYYY;
    this.fieldProps.placeholder = "请选择年份";
    this.formItemProps.label = "年份选择";
  }
}

// 月份选择器
export class TjMonth extends TjDatetime {
  constructor() {
    super();
    this.label = "月份选择";
    this.fieldProps.type = "month";
    this.fieldProps.format = DateTimeEnum.YYYY_MM;
    this.fieldProps.valueFormat = DateTimeEnum.YYYY_MM;
    this.fieldProps.placeholder = "请选择月份";
    this.formItemProps.label = "月份选择";
  }
}

// 日期选择器
export class TjDate extends TjDatetime {
  constructor() {
    super();
    this.label = "日期选择";
    this.fieldProps.type = "date";
    this.fieldProps.format = DateTimeEnum.YYYY_MM_DD;
    this.fieldProps.valueFormat = DateTimeEnum.YYYY_MM_DD;
    this.fieldProps.placeholder = "请选择日期";
    this.formItemProps.label = "日期选择";
  }
}

// 日期时间选择器
export class TjDateTime extends TjDatetime {
  constructor() {
    super();
    this.label = "日期时间选择";
    this.fieldProps.type = "datetime";
    this.fieldProps.format = DateTimeEnum.YYYY_MM_DD_HH_mm_ss;
    this.fieldProps.valueFormat = DateTimeEnum.YYYY_MM_DD_HH_mm_ss;
    this.fieldProps.placeholder = "请选择日期时间";
    this.formItemProps.label = "日期时间选择";
  }
}

// 日期范围选择器
export class TjDateRange extends TjDatetime {
  constructor() {
    super();
    this.label = "日期范围";
    this.fieldProps.type = "daterange";
    this.fieldProps.format = DateTimeEnum.YYYY_MM_DD;
    this.fieldProps.valueFormat = DateTimeEnum.YYYY_MM_DD;
    this.fieldProps.placeholder = "请选择日期范围";
    this.formItemProps.label = "日期范围";
    this.valueProps.value = []; // 日期范围默认值为数组
  }
}

// 时间选择器
export class TjTime extends TjDatetime {
  constructor() {
    super();
    this.label = "时间选择";
    this.fieldProps.type = "time";
    this.fieldProps.format = DateTimeEnum.HH__mm_ss;
    this.fieldProps.valueFormat = DateTimeEnum.HH__mm_ss;
    this.fieldProps.placeholder = "请选择时间";
    this.formItemProps.label = "时间选择";
  }
}
