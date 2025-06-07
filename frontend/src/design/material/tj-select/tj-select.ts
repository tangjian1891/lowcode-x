import { MaterialEnum, FieldWidthEnum, ValueEnum } from "@/enums";

export class TjSelect {
  id = nanoid();
  type = MaterialEnum.TjSelect;
  fieldProps = {
    // el-select 基本属性
    modelValue: "", // 绑定值
    multiple: false, // 是否多选
    disabled: false, // 是否禁用
    valueKey: "value", // 作为 value 唯一标识的键名，绑定值为对象类型时必填
    size: "default", // 输入框尺寸
    clearable: false, // 是否可以清空选项
    collapseTags: false, // 多选时是否将选中值按文字的形式展示
    collapseTagsTooltip: false, // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签
    multipleLimit: 0, // 多选时用户最多可以选择的项目数，为 0 则不限制
    name: "", // 原生 name 属性
    autocomplete: "off", // 原生 autocomplete 属性
    placeholder: "请选择", // 占位符
    filterable: false, // 是否可搜索
    allowCreate: false, // 是否允许用户创建新条目，需配合 filterable 使用
    remote: false, // 是否为远程搜索
    loading: false, // 是否正在从远程获取数据
    loadingText: "加载中", // 远程加载时显示的文字
    noMatchText: "无匹配数据", // 搜索条件无匹配时显示的文字
    noDataText: "无数据", // 选项为空时显示的文字
    reserveKeyword: false, // 当选中一个选项后，是否保留搜索关键词
    defaultFirstOption: false, // 在输入框按下回车，选择第一个匹配项
    popperAppendToBody: true, // 是否将弹出框插入至 body 元素
    teleported: true, // 是否将弹出框插入至 body 元素
    persistent: true, // 当下拉选择器未被激活并且persistent设置为false，选项将会被销毁
    automaticDropdown: false, // 对于不可过滤的 Select，是否在输入框获得焦点后自动弹出选项菜单
    clearIcon: "", // 自定义清空图标
    fitInputWidth: false, // 下拉框的宽度是否与输入框相同
    suffixIcon: "", // 自定义后缀图标
    tagType: "info", // 多选标签的类型
    validateEvent: true, // 是否触发表单验证
    placement: "bottom-start", // 弹窗位置
    maxCollapseTags: 1, // 最大显示折叠标签数量
  };
  options = [
    {
      label: "选项1",
      value: "1",
    },
    {
      label: "选项2",
      value: "2",
    },
  ]; // 选项数据
  valueProps = {
    type: ValueEnum.Default,
    value: "", // 默认值，多选时为数组
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
    label: "下拉单选",
    description: "", // 描述文本
  };
  enabledProps = {
    label: true,
    description: false,
    options: true, // 控制是否显示选项配置
    multiple: true, // 控制是否显示多选配置
  };
}

// 多选下拉框
export class TjMultiSelect extends TjSelect {
  constructor() {
    super();
    this.fieldProps.multiple = true;
    this.fieldProps.collapseTags = true;
    this.fieldProps.collapseTagsTooltip = true;
    this.valueProps.value = []; // 多选时默认值为空数组
    this.formItemProps.label = "下拉多选";
  }
}
