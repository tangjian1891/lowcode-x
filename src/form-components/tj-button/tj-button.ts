import { nanoid } from 'nanoid'
import JasButtonVue from './jas-button.vue'
import type { ITjTable } from '@/core-components/tj-table/tj-table'
import { Permission } from '@/utils/permissions'

class TjButton {
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
  label?: string

  // 权限控制相关属性
  permission?: Permission // 按钮所需权限，可以是单个权限或权限数组
  hideWhenNoPermission: boolean = true // 无权限时是否隐藏按钮，默认隐藏
  disableWhenNoPermission: boolean = false // 无权限时是否禁用按钮，默认不禁用（因为默认是隐藏）

  component = markRaw(JasButtonVue)

  constructor(props: Partial<TjButton> = {}) {
    // 用传入的属性覆盖默认值
    Object.assign(this, props)
  }

  onClick(button: ITjButton, tjTable: ITjTable) {
    // 默认的点击行为，子类可以覆盖
  }
}

// 类型帮助函数
type TjType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type ITjButton = TjType<TjButton>

// 创建基础按钮的工厂函数
export function createTjButton(label?: string, params: Partial<ITjButton> = {}) {
  return new TjButton({ label, ...params })
}

/**
 * 创建带权限控制的按钮
 * @param label 按钮文本
 * @param permission 按钮所需权限
 * @param params 其他按钮参数
 * @returns 配置了权限的按钮实例
 */
export function createPermissionButton(
  label: string,
  permission: Permission | Permission[],
  params: Partial<ITjButton> = {},
) {
  return new TjButton({
    label,
    permission,
    hideWhenNoPermission: true,
    ...params,
  })
}

export default TjButton
