"use client";

import FormLists from "@/components/Forms/FormList";
import QueryFilter from "@/components/QueryFilter";
import useDepartments from "@/hooks/api/use-department";
import useAuth from "@/hooks/use-auth";
import { getAllForms } from "@/services/form.service";
import { Role } from "@/types/all";
import { EFormStatus } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";

const FormsClient: React.FC = () => {
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

  const { data: forms, isFetching } = useQuery({
    queryKey: ["forms", query],
    queryFn: () => getAllForms(query),
    keepPreviousData: true,
    enabled: !!query,
  });

  return (
    <div>
      <QueryFilter
        setQuery={setQuery}
        disabled={isFetching}
        isLoading={isFetching}
        pagination={forms?.data?.pagination}
        initPagination={{
          page: 1,
          limit: 10,
        }}
        items={[
          {
            key: "name",
            queryType: "search",
            placeholder: "Tìm kiếm theo tên mẫu đơn",
          },
          {
            key: "created_at",
            queryType: "sort",
            placeholder: "Sắp xếp theo ngày tạo",
            options: [
              {
                id: "asc",
                label: "Sắp xếp theo ngày tạo tăng dần",
                value: "asc",
              },
              {
                id: "desc",
                label: "Sắp xếp theo ngày tạo giảm dần",
                value: "desc",
              },
            ],
          },
          {
            key: "status",
            queryType: "filter",
            placeholder: "Lọc theo trạng thái",
            options: [
              {
                id: "1",
                label: "Trạng thái: Đã xuất bản",
                value: EFormStatus.PUBLISHED,
              },
              {
                id: "2",
                label: "Trạng thái: Lưu nháp",
                value: EFormStatus.DRAFT,
              },
              {
                id: "3",
                label: "Trạng thái: Đã lưu trữ",
                value: EFormStatus.ARCHIVED,
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
          <FormLists
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            forms={forms?.data?.results}
            isLoading={isFetching}
          />
        )}
      </QueryFilter>
    </div>
  );
};

export default FormsClient;
