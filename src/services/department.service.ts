import http from "@/lib/http";
import { IDepartment } from "@/types/all";
import { PropertyType } from "@/types/enums";
import { SortOrder } from "@/types/query";
import { Response } from "@/types/response";
import { WithPagination } from "@/types/with-pagination";
import { ApiEndpoint } from "./api-endpoint.service";

export interface IGetAllDepartmentsQuery {
  page?: number;
  limit?: number;
  search?: {
    name?: string;
  };
  sort?: {
    created_at?: SortOrder;
  };
  filter?: {
    type?: PropertyType;
  };
}

export interface ICreateDepartment {
  name: string;
  description: string;
}

export interface IUpdateDepartment extends ICreateDepartment {}

export const getAllDepartments = async (
  query?: string
): Promise<Response<WithPagination<IDepartment>>> => {
  return http.get<Response<WithPagination<IDepartment>>>(
    ApiEndpoint.departments + query
  );
};

export const getOneDepartment = async (
  departmentId: string
): Promise<Response<IDepartment>> => {
  return http.get<Response<IDepartment>>(
    `${ApiEndpoint.departments}/${departmentId}`
  );
};

export const createDepartment = async (
  data: ICreateDepartment
): Promise<Response<IDepartment>> => {
  return http.post<Response<IDepartment>>(`${ApiEndpoint.departments}`, data);
};

export const updateDepartment = async (
  departmentId: string,
  data: IUpdateDepartment
): Promise<Response<IDepartment>> => {
  return http.patch<Response<IDepartment>>(
    `${ApiEndpoint.departments}/${departmentId}`,
    data
  );
};

export const deleteDepartment = async (
  departmentId: string,
  isConfirmed: boolean
): Promise<Response<IDepartment>> => {
  return http.delete<Response<IDepartment>>(
    `${ApiEndpoint.departments}/${departmentId}`,
    {
      data: {
        is_confirm: isConfirmed,
      },
    }
  );
};
