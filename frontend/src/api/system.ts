import { instance } from "./request";

export const system = {
  create(data: any) {
    return instance.post("/system/create", data);
  },
  info(id: string) {
    return instance.get("/system/info", { params: { id } });
  },
  page(userId: string) {
    return instance.request({
      url: "/system/page",
      method: "post",
      params: { userId },
    });
  },
};
