import http from "@/lib/http";
import { IFormResponse, IFormResponseDetail } from "@/types/all";
import { Response } from "@/types/response";
import { WithPagination } from "@/types/with-pagination";
import { ApiEndpoint } from "./api-endpoint.service";

interface IRejectFormResponse {
  id: string;
  confirm: boolean;
  rejected_reason: string;
}

interface IForwardFormResponse {
  id: string;
  confirm: boolean;
}

export const getAllFormResponse = async (
  query?: string
): Promise<Response<WithPagination<IFormResponse>>> => {
  return http.get<Response<WithPagination<IFormResponse>>>(
    ApiEndpoint.formResponses + `${query}`
  );
};

export const getAllFormResponseByStatus = async (
  status: "processings" | "processed" | "rejects",
  query?: string
): Promise<Response<WithPagination<IFormResponse>>> => {
  return http.get<Response<WithPagination<IFormResponse>>>(
    `${ApiEndpoint.formResponses}/${status}${query}`
  );
};

export const getFormResponseDetail = async (
  formResponseId: string
): Promise<Response<IFormResponseDetail>> => {
  return http.get<Response<IFormResponseDetail>>(
    `${ApiEndpoint.formResponses}/detail/${formResponseId}`
  );
};

export const rejectFormResponse = async (
  data: IRejectFormResponse
): Promise<Response<IFormResponse>> => {
  return http.post<Response<IFormResponse>>(
    `${ApiEndpoint.formResponses}/reject`,
    data
  );
};

export const forwardFormResponse = async (
  data: IForwardFormResponse
): Promise<Response<IFormResponse>> => {
  return http.post<Response<IFormResponse>>(
    `${ApiEndpoint.formResponses}/forward`,
    data
  );
};
