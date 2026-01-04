import { instance } from "./request";

export const system = {
  create(data: any) {
    return instance.post("/system/create", data);
  },
  info(id: string) {
    return instance.get("/system/info", { params: { id } });
  },
  page(data) {
    return instance.request({
      url: "/system/list",
      method: "post",
      data,
    });
  },
  remove(data: anya) {
    return instance.post("/system/remove", data);
  },
};
