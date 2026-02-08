import { instance } from "./request";

export const formData = {
  get(id: string) {
    return instance.get(`/form/data/${id}`);
  },

  list(menuId: string, pageNum: number = 1, pageSize: number = 10) {
    return instance.post(`/form/data/list`, {
      formId: menuId,
      pageNum,
      pageSize,
    });
  },

  remove(ids: string[]) {
    return instance.post(`/form/data/delete`, { ids });
  },

  save(data: any) {
    return instance.post(`/form/data/save`, data);
  },

  init(menuId: string) {
    return instance.get(`/form/data/init/${menuId}`);
  },
};
