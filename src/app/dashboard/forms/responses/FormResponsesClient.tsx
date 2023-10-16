"use client";

import FormResponseList from "@/components/FormResponses/FormResponseList";
import QueryFilter from "@/components/QueryFilter";
import useDepartments from "@/hooks/api/use-department";
import useAuth from "@/hooks/use-auth";
import { getAllFormResponse } from "@/services/form-response.service";
import { Role } from "@/types/all";
import { EFormResponseStatus } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

const FormResponsesClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const [query, setQuery] = React.useState<string>("");

  const { departments } = useDepartments();

  const { data: formResponses, isFetching } = useQuery({
    queryKey: ["formResponses", query],
    queryFn: () => getAllFormResponse(query),
    keepPreviousData: true,
    enabled: !!query,
  });

  return (
    <div>
      <QueryFilter
        setQuery={setQuery}
        disabled={isFetching}
        isLoading={isFetching}
        pagination={formResponses?.data?.pagination}
        initPagination={{
          page: 1,
          limit: 9,
        }}
        items={[
          {
            key: "full_name",
            queryType: "search",
            placeholder: "Tìm kiếm theo tên người gửi",
          },
          {
            key: "email",
            queryType: "search",
            placeholder: "Tìm kiếm theo email người gửi",
          },
          {
            key: "status",
            queryType: "filter",
            placeholder: "Lọc theo trạng thái",
            options: [
              {
                id: "2",
                label: "Trạng thái: Đang xử lý",
                value: EFormResponseStatus.PROCESSING,
              },
              {
                id: "3",
                label: "Trạng thái: Đã hoàn thành",
                value: EFormResponseStatus.COMPLETED,
              },
              {
                id: "4",
                label: "Trạng thái: Bị từ chối",
                value: EFormResponseStatus.REJECTED,
              },
            ],
          },
          {
            key: "department_id",
            queryType: "filter",
            placeholder: "Lọc theo phòng ban",
            options: departments?.map((d) => ({
              id: d.id,
              label: d.name,
              value: d.id,
            })),
          },
        ]}
      >
        {({ pagination, onPaginationChange }) => (
          <FormResponseList
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            formResponses={formResponses?.data?.results}
            isLoading={isFetching}
          />
        )}
      </QueryFilter>
    </div>
  );
};

export default FormResponsesClient;
