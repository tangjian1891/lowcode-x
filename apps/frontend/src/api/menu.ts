import { instance } from "./request";

export const menu = {
  save(data: any) {
    return instance.post("/menu/save", data);
  },
  info(id: string) {
    return instance.get(`/menu/info/`, { params: { id } });
  },
  getMenuById(id: string) {
    return instance.get(`/menu/${id}`);
  },

  tree(systemId: string) {
    return instance.post("/menu/tree", { systemId });
  },
};
