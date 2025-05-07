import TjSearch from './tj-search/index.vue'
import TjToolBar from './tj-toolbar/index.vue'
import TjGrid from './tj-grid/index.vue'
import TjPagination from './tj-pagination/index.vue'
export type { ITjTable } from './tj-table'
/**
 * 导出通用的四个组件。
 */
export function getDefaultComponents() {
  return [TjSearch, TjToolBar, TjGrid, TjPagination]
}
