export class JasTable {
  templateList = []
  fields = []
  form = {}
  buttons = []

  constructor(params: Partial<JasTable>) {
    Object.assign(this, params)
  }
}

type JasType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type IJasTable = JasType<JasTable>
