import http from "@/lib/http";
import { IForm } from "@/types/all";
import { EFormStatus } from "@/types/enums";
import { SortOrder } from "@/types/query";
import { Response } from "@/types/response";
import { WithPagination } from "@/types/with-pagination";
import { ApiEndpoint } from "./api-endpoint.service";

export interface IGetAllFormsQuery {
  page?: number;
  limit?: number;
  search?: {
    name?: string;
  };
  sort?: {
    created_at?: SortOrder;
  };
  filter?: {
    status?: EFormStatus;
    department_id?: string;
  };
}

export interface ICreateFormProperty {
  property_id: string;
  is_required: boolean;
}

export interface IBaseStep {
  department_id: string;
  time_limit: number;
}

export interface ICreateFormStep {
  department_id: string;
  time_limit: number;
}

export interface ICreateForm {
  name: string;
  description: string;
  status: string;
  processing_time: number;
  processing_steps: ICreateFormStep[] | undefined;
  properties: ICreateFormProperty[] | undefined;
}

export interface IUpdateForm extends ICreateForm {}

export const getAllForms = async (
  query?: string
): Promise<Response<WithPagination<IForm>>> => {
  return http.get<Response<WithPagination<IForm>>>(ApiEndpoint.forms + query);
};

export const getOneForm = async (
  departmentId: string
): Promise<Response<IForm>> => {
  return http.get<Response<IForm>>(`${ApiEndpoint.forms}/${departmentId}`);
};

export const createForm = async (
  data: ICreateForm
): Promise<Response<IForm>> => {
  return http.post<Response<IForm>>(`${ApiEndpoint.forms}`, data);
};

export const updateForm = async (
  departmentId: string,
  data: IUpdateForm
): Promise<Response<IForm>> => {
  return http.patch<Response<IForm>>(
    `${ApiEndpoint.forms}/${departmentId}`,
    data
  );
};

export const deleteForm = async (
  departmentId: string,
  isConfirmed: boolean
): Promise<Response<IForm>> => {
  return http.delete<Response<IForm>>(`${ApiEndpoint.forms}/${departmentId}`, {
    data: {
      is_confirm: isConfirmed,
    },
  });
};
