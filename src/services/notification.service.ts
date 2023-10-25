import http from "@/lib/http";
import { INotification } from "@/types/all";
import { Response } from "@/types/response";
import { WithPagination } from "@/types/with-pagination";
import { ApiEndpoint } from "./api-endpoint.service";

export const getNotificationDetail = async (
  notificationId: string
): Promise<Response<INotification>> => {
  return http.get<Response<INotification>>(
    `${ApiEndpoint.notificationDetail}/${notificationId}`
  );
};

export const getAllNotifications = async (): Promise<
  Response<WithPagination<INotification>>
> => {
  return http.get<Response<WithPagination<INotification>>>(
    `${ApiEndpoint.notifications}`
  );
};
