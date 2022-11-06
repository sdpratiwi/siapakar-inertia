import { atom } from "recoil";

export const baseUrlApi = atom({
  key: "baseUrlApi",
  default: "http://localhost:8000/api/",
});