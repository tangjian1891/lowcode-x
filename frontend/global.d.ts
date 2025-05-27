// 实际枚举定义
// export enum Sex {
//   Male = 'male',
//   Female = 'female',
//   Unknown = 'unknown',
// }

// 全局类型声明
export declare global {
  interface Window {
    dayjs: typeof import("dayjs");
  }
  // const dayjs: typeof import('dayjs')
}
