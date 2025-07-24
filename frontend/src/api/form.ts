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

  list(menuId: string) {
    return instance.get(`/forms/${menuId}/list`);
  },
  create(menuId: string, data: any) {
    return instance.post(`/forms/${menuId}/create`, data);
  },
};
