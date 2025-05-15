import dayjs from "dayjs";
import { nanoid, customAlphabet } from "nanoid";

const alphaId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 1);
const generateId = () => {
  return alphaId() + nanoid(); //字母开头，兼容css selector
};
export { dayjs, generateId as nanoid };
