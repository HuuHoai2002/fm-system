import http from "@/lib/http";
import { IProperty } from "@/types/all";
import { PropertyType } from "@/types/enums";
import { SortOrder } from "@/types/query";
import { Response } from "@/types/response";
import { WithPagination } from "@/types/with-pagination";
import { ApiEndpoint } from "./api-endpoint.service";

export interface IGetAllPropertiesQuery {
  page?: number;
  limit?: number;
  search?: {
    name?: string;
  };
  sort?: {
    created_at?: SortOrder;
  };
}

export type PropertyOption = {
  label: string;
  value: string;
  description: string;
};
export interface ICreateProperty {
  name: string;
  description: string;
  property_type: PropertyType | string;
  is_multiple: boolean;
  options: PropertyOption[] | undefined;
}

export interface IUpdateProperty extends ICreateProperty {}

export const getAllProperties = async (
  query?: string
): Promise<Response<WithPagination<IProperty>>> => {
  return http.get<Response<WithPagination<IProperty>>>(
    ApiEndpoint.properties + query
  );
};

export const getOneProperty = async (
  propertyId: string
): Promise<Response<IProperty>> => {
  return http.get<Response<IProperty>>(
    `${ApiEndpoint.properties}/${propertyId}`
  );
};

export const createProperty = async (
  data: ICreateProperty
): Promise<Response<IProperty>> => {
  return http.post<Response<IProperty>>(`${ApiEndpoint.properties}`, data);
};

export const updateProperty = async (
  propertyId: string,
  data: IUpdateProperty
): Promise<Response<IProperty>> => {
  return http.patch<Response<IProperty>>(
    `${ApiEndpoint.properties}/${propertyId}`,
    data
  );
};

export const deleteProperty = async (
  propertyId: string,
  isConfirmed: boolean
): Promise<Response<IProperty>> => {
  return http.delete<Response<IProperty>>(
    `${ApiEndpoint.properties}/${propertyId}`,
    {
      data: {
        is_confirm: isConfirmed,
      },
    }
  );
};
