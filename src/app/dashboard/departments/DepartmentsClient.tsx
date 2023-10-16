"use client";

import ButtonLink from "@/components/Button/ButtonLink";
import QueryFilter from "@/components/QueryFilter";
import { DepartmentColumns } from "@/components/Table/columns";
import RenderDepartmentCell from "@/components/Table/RenderDepartmentCell";
import TableContainer from "@/components/Table/TableContainer";
import TableTopContent from "@/components/Table/TableTopContent";
import { appLinks } from "@/config/app.config";
import { DEPARTMENT_PATH } from "@/constants/paths";
import useAuth from "@/hooks/use-auth";
import { getAllDepartments } from "@/services/department.service";
import { Role } from "@/types/all";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import { HiPlus } from "react-icons/hi2";

const DepartmentsClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const [query, setQuery] = React.useState<string>("");

  const { data: departments, isFetching } = useQuery({
    queryKey: ["departments", query],
    queryFn: () => getAllDepartments(query),
    keepPreviousData: true,
    enabled: !!query,
  });

  return (
    <div>
      <QueryFilter
        setQuery={setQuery}
        disabled={isFetching}
        isLoading={isFetching}
        pagination={departments?.data?.pagination}
        initPagination={{
          page: 1,
          limit: 10,
        }}
        items={[
          {
            key: "name",
            queryType: "search",
            placeholder: "Tìm kiếm theo tên phòng ban",
          },
        ]}
      >
        {({ pagination, onPaginationChange }) => (
          <TableContainer
            data={{
              items: departments?.data?.results,
              isFetching,
            }}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            columns={DepartmentColumns}
            config={{
              topContent: (
                <TableTopContent>
                  <ButtonLink
                    size="sm"
                    href={appLinks.createDepartment}
                    color="primary"
                  >
                    <HiPlus />
                    Thêm phòng ban
                  </ButtonLink>
                </TableTopContent>
              ),
              baseHref: DEPARTMENT_PATH,
            }}
          >
            {({ item, columnKey }) => (
              <RenderDepartmentCell department={item} columnKey={columnKey} />
            )}
          </TableContainer>
        )}
      </QueryFilter>
    </div>
  );
};

export default DepartmentsClient;
