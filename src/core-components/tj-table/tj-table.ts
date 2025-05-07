export class TjTable {
  fields = []
  form = {}
  toolbar = {
    buttons: [],
    search: true,
    sort: true,
    refresh: true,
    fullscreen: true,
  }
  grid = {}
  pagination = {
    pageSize: 50,
    pageSizes: [10, 20, 50, 100],
    total: 0,
    currentPage: 1,
  }
  constructor(params: Partial<JasTable>) {
    Object.assign(this, params)
  }
}

type generalType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type ITjTable = generalType<TjTable>
