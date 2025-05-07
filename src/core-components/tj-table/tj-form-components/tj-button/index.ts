import { ElButton } from 'element-plus'
import { nanoid } from 'nanoid'
import JasButtonVue from './jas-button.vue'
import type { IJasTable } from '../jas-page'
import { createDialog } from '@/tj-dialog/index.ts'
import JasImport from '../jas-import/index.vue'
import JasForm from '@/core-components/tj-form/index.vue'
class JasButton {
  id = nanoid()
  // el-button 的属性及默认值
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | 'text' | '' = 'primary'
  size: 'large' | 'default' | 'small' | '' = 'default'
  icon?: string
  nativeType: 'button' | 'submit' | 'reset' = 'button'
  loading: boolean = false
  disabled: boolean = false
  plain: boolean = false
  autofocus: boolean = false
  round: boolean = false
  circle: boolean = false
  color?: string
  dark: boolean = false
  text: boolean = false
  bg: boolean = false
  link: boolean = false
  underline: boolean = true

  component = markRaw(JasButtonVue)
  constructor(props: Partial<JasButton> = {}) {
    // 用传入的属性覆盖默认值
    Object.assign(this, props)
  }

  onClick(button: IJasButton, tjTable: IJasTable) {}
}
export default JasButton

type JasType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type IJasButton = JasType<JasButton>

export function createJasButton(label, params: Partial<IJasButton> = {}) {
  return new JasButton({ label, ...params })
}

// 新增
export function createJasButtonAdd(...args) {
  const button = createJasButton(...args)
  button.onClick = (button, tjTable) => {
    createDialog(tjTable, JasForm)
  }
  return button
}
// 编辑
export function createJasButtonEdit(...args) {
  const button = createJasButton(...args)
  button.onClick = (button, tjTable) => {
    createDialog(tjTable, JasForm)
  }
  return button
}

export function createJasButtonExport(...args) {
  const button = createJasButton(...args)
  button.onClick = (button, tjTable) => {
    console.log('点击触发')
  }
  return button
}

// 导入
export function createJasButtonImport(...args) {
  const button = createJasButton(...args)
  button.onClick = (button, tjTable) => {
    createDialog(tjTable, JasImport)
  }
  return button
}

// 行内按钮
export function createInlineJasButton(label, params = {}) {
  return { ElButton }
}
