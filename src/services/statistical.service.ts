import http from "@/lib/http";
import { IReportStatistical } from "@/types/all";
import { Response } from "@/types/response";
import { ApiEndpoint } from "./api-endpoint.service";

export type ReportType = "month" | "today" | "week" | "year";

export const getStatistical = async (type?: ReportType) => {
  return http.get<Response<IReportStatistical>>(
    `${ApiEndpoint.getStatistical}?report_type=${type}`
  );
};
