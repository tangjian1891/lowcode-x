import { JasTable } from './jas-page'
export type { IJasTable } from './jas-page'
import JasSearch from './jas-search/jas-search.vue'
import JasButtonArea from './jas-button-area/jas-button-area.vue'
import JasContent from './jas-content/jas-content.vue'
import JasPagination from './jas-pagination/jas-pagination.vue'
import { isNil } from 'lodash-es'

/**
 * 创建核心对象
 */
export const createJasTable = (params: Partial<JasTable> = {}) => {
  if (isNil(params.templateList)) {
    params.templateList = [JasSearch, JasButtonArea, JasContent, JasPagination]
  }
  return new JasTable(params)
}

export { JasTable }
