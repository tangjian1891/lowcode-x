// 实际枚举定义
// export enum Sex {
//   Male = 'male',
//   Female = 'female',
//   Unknown = 'unknown',
// }

// 全局类型声明
declare global {
  const Sex: typeof Sex
  type Sex = Sex

  // const dayjs: typeof import('dayjs')
}
