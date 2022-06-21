import axios, { AxiosInstance } from "axios";

const API_URI = process.env.NEXT_PUBLIC_API_URL;

export const instance = (
  // query: string = "",
  // pageNumber: number = 0
): AxiosInstance => {
  if (typeof window !== 'undefined') {
    // console.log('You are on the browser')
    // const token = localStorage.getItem("token") ?? "";
    // console.log("token", token)
  } else {
    console.log('You are on the server')
  }
  let cancel;
  return axios.create({
    baseURL: API_URI,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      // 'Access-Control-Allow-Credentials': 'true',
      // "Allow": "GET, POST, HEAD",
    },
    // params: {
    //   q: query,
    //   page: pageNumber,
    // },
    // cancelToken: new axios.CancelToken((c) => (cancel = c)),
  });
};

export const authInstance: AxiosInstance = axios.create({
  baseURL: API_URI,
  headers: {
    // "Content-Type": "application/json; charset=utf-8",
    "Content-Type": "multipart/form-data",
    'Access-Control-Allow-Origin' : '*',
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    // "Allow": "GET, POST, HEAD",
  },
  
});
