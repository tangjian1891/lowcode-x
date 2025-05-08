import TjButton, { ButtonEnableCondition, type ITjButton } from './tj-button'
import type { ITjTable } from '@/core-components/tj-table/tj-table'
import { createDialog } from '@/tj-dialog/index'
import JasForm from '@/core-components/tj-form/index.vue'
import { Permission } from '@/utils/permissions'

/**
 * 创建添加按钮
 * @param label 按钮文本
 * @param params 按钮参数
 */
export function createAddButton(label = '新增') {
  const button = new TjButton({
    label,
    type: 'primary',
    permission: Permission.ADD, // 默认使用通用创建权限
    enableCondition: ButtonEnableCondition.ALWAYS,
  })

  button.onClick = (button: ITjButton, tjTable: ITjTable) => {
    createDialog(tjTable, JasForm)
  }

  return button
}

export default createAddButton
