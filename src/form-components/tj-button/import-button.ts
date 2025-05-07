import { createTjButton, type ITjButton } from './tj-button'
import type { ITjTable } from '@/core-components/tj-table/tj-table'
import { createDialog } from '@/tj-dialog/index'
import JasImport from '../tj-import/index.vue'
import { Permission } from '@/utils/permissions'

/**
 * 创建导入按钮
 * @param label 按钮文本
 * @param params 按钮参数
 */
export function createImportButton(label = '导入', params: Partial<ITjButton> = {}) {
  const button = createTjButton(label, {
    type: 'primary',
    permission: Permission.IMPORT, // 默认使用通用导入权限
    ...params,
  })

  button.onClick = (button: ITjButton, tjTable: ITjTable) => {
    createDialog(tjTable, JasImport)
  }

  return button
}

export default createImportButton
