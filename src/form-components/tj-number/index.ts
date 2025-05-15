import JasNumberVue from "./index.vue";

export class JasNumber {
  id: string = "";
  label: string = "";
  type: string = "number";
  modelValue: number = 0;
  max: number = Infinity;
  min: number = -Infinity;
  step: number = 1;
  stepStrictly: boolean = false;
  precision: number = undefined;
  size: string = "";
  disabled: boolean = false;
  readonly: boolean = false;
  controls: boolean = false;
  controlsPosition: string = "";
  placeholder: string = "请输入数字";
  fieldName: string = ""; // 字段名
  component = markRaw(JasNumberVue);

  constructor(params: Partial<JasNumber>) {
    Object.assign(this, params);
  }

  onChange = (value) => {
    console.log("数字变化了", value);
  };
}

export function createJasNumber(id: string, label: string, params: Partial<JasNumber> = {}) {
  return new JasNumber({ id, label, ...params });
}

type JasType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K];
};

export type IJasNumber = JasType<JasNumber>;
