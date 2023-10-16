import http from "@/lib/http";
import { IUser } from "@/types/all";
import { SortOrder } from "@/types/query";
import { Response } from "@/types/response";
import { WithPagination } from "@/types/with-pagination";
import { ApiEndpoint } from "./api-endpoint.service";

export interface IGetAllAccountsQuery {
  page?: number;
  limit?: number;
  search?: {
    full_name?: string;
    email?: string;
  };
  filter?: {
    department_id?: string;
  };
  sort?: {
    created_at?: SortOrder;
  };
}

export interface ICreateAccount {
  email: string;
  full_name: string;
  password: string;
  role: string;
  department_id: string | undefined;
}
export interface IUpdateAccount {
  email: string;
  full_name: string;
  role: string;
  department_id: string | undefined;
}

export const getAllAccounts = async (
  query?: string
): Promise<Response<WithPagination<IUser>>> => {
  return http.get<Response<WithPagination<IUser>>>(
    ApiEndpoint.accounts + query
  );
};

export const getOneAccount = async (
  accountId: string
): Promise<Response<IUser>> => {
  return http.get<Response<IUser>>(`${ApiEndpoint.accounts}/${accountId}`);
};

export const createAccount = async (
  data: ICreateAccount
): Promise<Response<IUser>> => {
  return http.post<Response<IUser>>(`${ApiEndpoint.accounts}`, data);
};

export const updateAccount = async (
  accountId: string,
  data: IUpdateAccount
): Promise<Response<IUser>> => {
  return http.patch<Response<IUser>>(
    `${ApiEndpoint.accounts}/${accountId}`,
    data
  );
};

export const deleteAccount = async (
  accountId: string,
  isConfirmed: boolean
): Promise<Response<IUser>> => {
  return http.delete<Response<IUser>>(`${ApiEndpoint.accounts}/${accountId}`, {
    data: {
      is_confirm: isConfirmed,
    },
  });
};
