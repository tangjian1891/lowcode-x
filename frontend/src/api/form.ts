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

  info(menuId: string, id: string) {
    return instance({
      url: `forms/${menuId}/info`,
      method: "GET",
      params: { id },
    });
  },

  list(menuId: string) {
    return instance.post(`/forms/${menuId}/list`);
  },
  create(menuId: string, data: any) {
    return instance.post(`/forms/${menuId}/create`, data);
  },
};
