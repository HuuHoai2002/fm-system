import { Response } from "@/types/response";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Accept-Language": "vi",
};

const http = axios.create({
  headers,
  withCredentials: true,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<Response<any>>) => {
    switch (error.response?.data.code) {
      case 401: {
        if (typeof window !== undefined) {
          // window.location.href = LOGIN_PATH;
        }
        break;
      }
      case 403: {
        if (typeof window !== undefined) {
          Swal.fire({
            icon: "warning",
            title:
              "Quyền truy cập của tài khoản bị hạn chế đối với tài nguyên này!",
            text: error.response?.data?.message || "",
            confirmButtonText: "Đóng",
            allowOutsideClick: false,
          });
        }
        break;
      }
      default: {
        break;
      }
    }

    return Promise.reject(error.response?.data);
  }
);

export default http;
