import { instance } from "./request";

export const form = {
  getDataByMenuId(menuId: string) {
    return instance({
      url: `/forms/relateId/${menuId}`,
    });
  },

  getList(formId: string) {
    return instance({
      url: `forms/${formId}/data`,
    });
  },
  removeById(formId: string, id: string) {
    return instance({
      url: `forms/${formId}/${id}`,
      method: "DELETE",
    });
  },

  getDataById(formId: string, id: string) {
    return instance({
      url: `forms/get/${formId}/${id}`,
      method: "GET",
    });
  },
};
