import axios from "axios";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");
const withTrailingSlash = (url: string) => `${trimTrailingSlash(url)}/`;

const apiRoot = trimTrailingSlash(process.env.REACT_APP_API_BASE_URL || "http://localhost:3001");
const baseURL = withTrailingSlash(process.env.REACT_APP_ADMIN_API_BASE_URL || `${apiRoot}/admin`);

export const uploadUrl = withTrailingSlash(process.env.REACT_APP_UPLOAD_URL || `${apiRoot}/uploads`);
export const instance: any = axios.create({ baseURL });

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
