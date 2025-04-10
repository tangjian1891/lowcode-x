export class JasTable {
  private data: any[]
  templateList = []

  constructor(params: Partial<JasTable>) {
    Object.assign(this, params)
  }

  addRow(row: any): void {
    this.data.push(row)
  }

  removeRow(index: number): void {
    if (index >= 0 && index < this.data.length) {
      this.data.splice(index, 1)
    }
  }

  getData(): any[] {
    return this.data
  }
}

type JasType<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K]
}

export type IJasTable = JasType<JasTable>
