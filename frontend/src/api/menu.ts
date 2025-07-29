import { instance } from "./request";

export const menu = {
  create(data: any) {
    return instance.post("/menu/create", data);
  },
  info(id: string) {
    return instance.get(`/menu/info/`, { params: { id } });
  },
  getMenuById(id: string) {
    return instance.get(`/menu/${id}`);
  },

  tree(systemId: string) {
    return instance.get("/menu/tree", { params: { systemId } });
  },
};
