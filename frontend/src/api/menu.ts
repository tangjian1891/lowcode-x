import { instance } from "./request";

export const menu = {
  getMenuById(id: string) {
    return instance.get(`/menu/${id}`);
  },
};
