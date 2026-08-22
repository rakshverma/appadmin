import { instance } from "./axios";

export const request = (
  method: string,
  url: string,
  payload: any = null,
  isPrivate = 1,
  headers: any = null
) => {
  const requestData: any = { method, url };
  const token = localStorage.getItem("token");
  if (payload) requestData.data = payload;
  if (isPrivate) {
    if (headers) {
      requestData.headers = {
        Accept: "*/*",
        ...headers,
      };
    } else {
      requestData.headers = {
        "Content-Type": "application/json",
      };
    }
    if (token) requestData.headers.Authorization = `Bearer ${token}`;
  } else {
    requestData.headers = {
      "Content-Type": "application/json",
    };
  }
  return instance(requestData);
};
