"use client";

import ButtonLink from "@/components/Button/ButtonLink";
import QueryFilter from "@/components/QueryFilter";
import { AccountColumns } from "@/components/Table/columns";
import RenderAccountCell from "@/components/Table/RenderAccountCell";
import TableContainer from "@/components/Table/TableContainer";
import TableTopContent from "@/components/Table/TableTopContent";
import { appLinks } from "@/config/app.config";
import { ACCOUNT_PATH } from "@/constants/paths";
import useAuth from "@/hooks/use-auth";
import { getAllAccounts } from "@/services/account.service";
import { Role } from "@/types/all";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import { HiPlus } from "react-icons/hi2";

const AccountsClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const [query, setQuery] = React.useState<string>("");

  const { data: accounts, isFetching } = useQuery({
    queryKey: ["accounts", query],
    queryFn: () => getAllAccounts(query),
    keepPreviousData: true,
    enabled: !!query,
  });

  return (
    <div>
      <QueryFilter
        setQuery={setQuery}
        disabled={isFetching}
        isLoading={isFetching}
        pagination={accounts?.data?.pagination}
        initPagination={{
          page: 1,
          limit: 10,
        }}
        items={[
          {
            key: "full_name",
            queryType: "search",
            placeholder: "Tìm kiếm theo tên tài khoản",
          },
          {
            key: "email",
            queryType: "search",
            placeholder: "Tìm kiếm theo email",
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
            key: "role",
            queryType: "filter",
            placeholder: "Lọc theo vai trò",
            options: [
              {
                id: "ADMIN",
                label: "Vai trò: Quản trị viên",
                value: Role.ADMIN,
              },
              {
                id: "MANAGER",
                label: "Vai trò: Quản lý",
                value: "MANAGER",
              },
              {
                id: "USER",
                label: "Vai trò: Người dùng",
                value: Role.USER,
              },
            ],
          },
        ]}
      >
        {({ pagination, onPaginationChange }) => (
          <TableContainer
            data={{
              items: accounts?.data?.results,
              isFetching,
            }}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            columns={AccountColumns}
            config={{
              topContent: (
                <TableTopContent>
                  <ButtonLink
                    size="sm"
                    href={appLinks.createAccount}
                    color="primary"
                  >
                    <HiPlus />
                    Tạo tài khoản
                  </ButtonLink>
                </TableTopContent>
              ),
              baseHref: ACCOUNT_PATH,
            }}
          >
            {({ item, columnKey }) => (
              <RenderAccountCell user={item} columnKey={columnKey} />
            )}
          </TableContainer>
        )}
      </QueryFilter>
    </div>
  );
};

export default AccountsClient;
