import request from "@/utils/request";
export const loginApi = (params) => request({ url: "/api/login", method: "get", params });
export const getMenusApi = (data) => request({ url: "/api/getMenus", method: "post", data });
