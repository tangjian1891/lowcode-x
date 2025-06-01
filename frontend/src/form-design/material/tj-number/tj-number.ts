import { MaterialEnum, FieldWidthEnum } from "@/enums";

export class TjNumber {
  type = MaterialEnum.TjNumber;
  label = "数字";
  fieldProps = {
    // el-input 基本属性
    type: "text", // 输入框类型
    modelValue: "", // 绑定值
    maxlength: undefined, // 最大输入长度
    minlength: undefined, // 最小输入长度
    showWordLimit: false, // 是否显示输入字数统计
    placeholder: "", // 输入框占位文本
    clearable: false, // 是否可清空
    showPassword: false, // 是否显示切换密码图标
    disabled: false, // 是否禁用
    size: "default", // 输入框尺寸
    prefixIcon: "", // 输入框头部图标
    suffixIcon: "", // 输入框尾部图标
    rows: 3, // 输入框行数，只对 type="textarea" 有效
    autosize: false, // 自适应内容高度，只对 type="textarea" 有效
    autocomplete: "off", // 原生autocomplete属性
    name: "", // 原生name属性
    readonly: false, // 是否只读
    max: undefined, // 原生max属性，设置最大值
    min: undefined, // 原生min属性，设置最小值
    step: undefined, // 原生step属性，设置输入字段的合法数字间隔
    resize: "none", // 控制是否能被用户缩放
    autofocus: false, // 原生autofocus属性
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
    decimal: 0,
    max: null,
    min: null,
  };
  layoutProps = {
    type: FieldWidthEnum.FixedPercentage,
    value: 24,
  };
  formItemProps = {
    label: "单行文本",
    description: "", // 描述文本
  };
  enabledProps = {
    label: true,
    description: false,
    decimal: false,
    range: false,
  };
}
