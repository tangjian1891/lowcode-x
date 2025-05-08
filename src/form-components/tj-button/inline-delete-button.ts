import TjButton, { type ITjButton } from './tj-button'
import type { ITjTable } from '@/core-components/tj-table/tj-table'
import { ElMessageBox } from 'element-plus'
import { Permission } from '@/utils/permissions'

/**
 * 创建删除按钮
 * @param label 按钮文本
 * @param params 按钮参数
 */
export function createDeleteButton(label = '删除', params: Partial<ITjButton> = {}) {
  const button = new TjButton({
    label,
    type: 'danger',
    permission: Permission.DELETE, // 默认使用通用删除权限
    ...params,
  })

  button.onClick = (button: ITjButton, tjTable: ITjTable) => {
    ElMessageBox.confirm('确认删除选中的记录吗？', '删除确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        // 执行删除操作
        if (tjTable.onDelete) {
          tjTable.onDelete()
        }
      })
      .catch(() => {
        // 取消操作
      })
  }

  return button
}

export default createDeleteButton
