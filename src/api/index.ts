import axios from "axios";

import baseURL from "./baseUrl";

const instance = axios.create({
  baseURL,
  timeout: 1000,
});

type ApiOptions = {
  data?: object;
  method?: "get" | "put" | "post" | "delete";
  params?: object;
};

export const fetchAPI = async (url: string, options: ApiOptions = {}) => {
  const { data, method = "get", params } = options;
  const accessToken = localStorage.getItem("token");
  const response = await instance.request({
    data,
    headers: {
      Authorization: `${accessToken}`,
    },
    method,
    params,
    url,
  });

  return response.data;
};

export default fetchAPI;
