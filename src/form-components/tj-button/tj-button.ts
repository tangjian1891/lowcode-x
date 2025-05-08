import { nanoid } from 'nanoid'
import JasButtonVue from './jas-button.vue'
import type { ITjTable } from '@/core-components/tj-table/tj-table'
import { Permission } from '@/utils/permissions'

export enum ButtonEnableCondition {
  /** 任何情况下都可用 */
  ALWAYS = 'always',
  /** 选择了至少一行数据时可用 */
  ONE_ROW_SELECTED = 'oneRowSelected',
  /** 选择了多行数据时可用 */
  MULTIPLE_ROWS_SELECTED = 'multipleRowsSelected',
  /** 选择了单行数据时可用 */
  SINGLE_ROW_SELECTED = 'singleRowSelected',
  /** 自定义条件 */
  CUSTOM = 'custom',
}

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

  // 按钮启用条件
  enableCondition: ButtonEnableCondition = ButtonEnableCondition.ALWAYS
  // 自定义启用条件函数
  customEnableCondition?: (selectedRows: any[], table: ITjTable) => boolean

  component = markRaw(JasButtonVue)

  constructor(props: Partial<TjButton> = {}) {
    // 用传入的属性覆盖默认值
    Object.assign(this, props)
  }

  onClick(button: ITjButton, tjTable: ITjTable) {
    // 默认的点击行为，子类可以覆盖
  }

  /**
   * 检查按钮是否应该被禁用
   * @param selectedRows 已选择的行数据
   * @param table 表格实例
   * @returns 是否禁用按钮
   */
  isDisabled(props): boolean {
    const oids = props.tjTable.oids
    switch (this.enableCondition) {
      case ButtonEnableCondition.ALWAYS:
        return false
      case ButtonEnableCondition.ONE_ROW_SELECTED:
        return oids.length === 0
      case ButtonEnableCondition.MULTIPLE_ROWS_SELECTED:
        return oids.length <= 1
      case ButtonEnableCondition.SINGLE_ROW_SELECTED:
        return oids.length !== 1
      case ButtonEnableCondition.CUSTOM:
        return false
      default:
        return false
    }
  }
}

// 类型帮助函数
type TjType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type ITjButton = TjType<TjButton>

export default TjButton
