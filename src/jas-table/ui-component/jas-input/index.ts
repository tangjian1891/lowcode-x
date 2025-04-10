import JasInputVue from './index.vue'
export class JasInput {
  type: string = 'text'
  modelValue: string | number = ''
  maxlength: string | number = ''
  minlength: string | number = ''
  placeholder: string = ''
  clearable: boolean = false
  showWordLimit: boolean = false
  readonly: boolean = false
  disabled: boolean = false
  autofocus: boolean = false
  autocomplete: string = 'off'
  name: string = ''
  max: string | number = ''
  min: string | number = ''
  step: string | number = ''
  resize: string = 'none'
  rows: number = 2
  autosize: boolean | { minRows?: number; maxRows?: number } = false
  form: string = ''
  tabindex: string | number = 0
  validateEvent: boolean = true
  component = JasInputVue
  constructor(params: Partial<JasInput>) {
    Object.assign(this, params)
  }
  onChange = (value) => {
    console.log('数据变动率', value)
  }
}

export function createJasInput(params: Partial<JasInput>) {
  return new JasInput(params)
}
