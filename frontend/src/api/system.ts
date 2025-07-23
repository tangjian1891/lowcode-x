import { instance } from "./request";

export const system = {
  create(data: any) {
    return instance.post("/system/create", data);
  },
  info(id: string) {
    return instance.get("/system/info", { params: { id } });
  },
  listByUserId(userId: string) {
    return instance.get("/system/listByUserId", { params: { userId } });
  },
};
