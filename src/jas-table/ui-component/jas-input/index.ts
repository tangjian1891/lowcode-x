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
  resize: string = ''
  rows: number = 2
  autosize: boolean | { minRows?: number; maxRows?: number } = false
  form: string = ''
  tabindex: string | number = 0
  validateEvent: boolean = true
  constructor(params: Partial<JasInput>) {
    Object.assign(this, params)
  }
}

export function createInput(params: Partial<JasInput>) {
  return new JasInput(params)
}
