import { instance } from "./request";

export const form = {
  getDataByMenuId(menuId: string) {
    return instance({
      url: `/forms/relateId/${menuId}`,
    });
  },
};
