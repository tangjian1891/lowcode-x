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
  remove(menuId: string, id: string) {
    return instance({
      url: `forms/${menuId}/remove`,
      method: "post",
      data: { id },
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
    return instance.post(`/form/data/list`, {
      formId: menuId,
      pageNum: 1,
      pageSize: 10,
    });
  },
  create(menuId: string, data: any) {
    return instance.post(`/forms/${menuId}/create`, data);
  },

  getFormSchema(menuId: string) {
    return instance.get(`/form/schema/${menuId}`);
  },

  init(menuId: string) {
    return instance.get(`/form/data/init/${menuId}`);
  },

  saveData(data: any) {
    return instance.post(`/form/data/save`, data);
  },

  findOneData(id: string) {
    return instance.get(`/form/data/${id}`);
  },
};
