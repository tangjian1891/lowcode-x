import { instance } from "./request";

export const formSchema = {
  get(menuId: string) {
    return instance({
      url: `/form/schema/${menuId}`,
    });
  },

  list(pageNum: number, pageSize: number) {
    return instance.post(`/form/schema/list`, {
      pageNum,
      pageSize,
    });
  },

  remove(ids: string[]) {
    return instance.post(`/form/schema/delete`, { ids });
  },

  save(data: any) {
    return instance.post(`/form/schema/save`, data);
  },
};
