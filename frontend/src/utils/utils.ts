export const utils = {
  /**
   * 重置对象属性，只适合最外层
   * @param object
   * @param exclude  保留得属性
   */
  resetObjectProperties(object: Record<string, any>, exclude: string[] = []) {
    for (const key in object) {
      if (!exclude.includes(key)) {
        object[key] = undefined;
      }
    }
  },
};
