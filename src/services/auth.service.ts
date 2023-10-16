import http from "@/lib/http";
import { IVerifyAuth } from "@/types/all";
import { Response } from "@/types/response";
import { ApiEndpoint } from "./api-endpoint.service";

export const verifyAuth = async (): Promise<Response<IVerifyAuth>> => {
  return http.get<Response<IVerifyAuth>>(ApiEndpoint.verify);
};

export const forgotPassword = async (
  email: string
): Promise<Response<null>> => {
  return http.post<Response<null>>(ApiEndpoint.forgotPassword, { email });
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string
): Promise<Response<null>> => {
  return http.post<Response<null>>(ApiEndpoint.resetPassword, {
    reset_password_token: token,
    password,
    confirm_password: confirmPassword,
  });
};
