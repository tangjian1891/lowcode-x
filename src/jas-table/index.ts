import { JasTable } from './jas-page'
export type { IJasTable } from './jas-page'
import JasSearch from './jas-search/jas-search.vue'
import JasButtonArea from './jas-button-area/jas-button-area.vue'
import JasTableArea from './jas-table-area/jas-table-area.vue'
import JasPagination from './jas-pagination/jas-pagination.vue'
import { isNil } from 'lodash-es'

/**
 * 创建核心对象
 */
export const createJasTable = (params: Partial<JasTable> = {}) => {
  if (isNil(params.templateList)) {
    params.templateList = [JasSearch, JasButtonArea, JasTableArea, JasPagination]
  }
  return new JasTable(params)
}

export { JasTable }
