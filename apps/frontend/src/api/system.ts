import { instance } from "./request";

export const system = {
  save(data: any) {
    return instance.post("/system/save", data);
  },
  detail(id: string) {
    return instance.get(`/system/${id}`);
  },
  page(data) {
    return instance.request({
      url: "/system/page",
      method: "post",
      data,
    });
  },
  remove(data: anya) {
    return instance.post("/system/remove", data);
  },
};
