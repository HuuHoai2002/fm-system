"use client";

import Breadcrumb from "@/components/Breadcrumb";
import ButtonLink from "@/components/Button/ButtonLink";
import QueryFilter from "@/components/QueryFilter";
import RenderPropertyTableCell from "@/components/Table/RenderPropertyCell";
import TableContainer from "@/components/Table/TableContainer";
import TableTopContent from "@/components/Table/TableTopContent";
import { PropertyColumns } from "@/components/Table/columns";
import { appLinks } from "@/config/app.config";
import { PROPERTY_PATH } from "@/constants/paths";
import useAuth from "@/hooks/use-auth";
import { FixturePropertyType } from "@/lib/utils";
import { getAllProperties } from "@/services/property.service";
import { Role } from "@/types/all";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import { HiPlus } from "react-icons/hi2";

const PropertiesClient: React.FC = () => {
  const {} = useAuth({
    roles: [Role.ADMIN],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  const [query, setQuery] = React.useState<string>("");

  const { data: properties, isFetching } = useQuery({
    queryKey: ["properties", query],
    queryFn: () => getAllProperties(query),
    keepPreviousData: true,
    enabled: !!query,
  });

  return (
    <div>
      <Breadcrumb title="Thuộc tính" />
      <QueryFilter
        setQuery={setQuery}
        disabled={isFetching}
        isLoading={isFetching}
        pagination={properties?.data?.pagination}
        initPagination={{
          page: 1,
          limit: 10,
        }}
        items={[
          {
            key: "name",
            queryType: "search",
            placeholder: "Tìm kiếm theo tên thuộc tính",
          },
          {
            key: "type",
            queryType: "filter",
            placeholder: "Tìm theo loại thuộc tính",
            options: FixturePropertyType,
          },
        ]}
      >
        {({ pagination, onPaginationChange }) => (
          <TableContainer
            columns={PropertyColumns}
            data={{ isFetching, items: properties?.data?.results }}
            onPaginationChange={onPaginationChange}
            pagination={pagination}
            config={{
              topContent: (
                <TableTopContent>
                  <ButtonLink
                    size="sm"
                    href={appLinks.createProperty}
                    color="primary"
                  >
                    <HiPlus />
                    Tạo thuộc tính
                  </ButtonLink>
                </TableTopContent>
              ),
              baseHref: PROPERTY_PATH,
            }}
          >
            {({ item, columnKey }) => (
              <RenderPropertyTableCell property={item} columnKey={columnKey} />
            )}
          </TableContainer>
        )}
      </QueryFilter>
    </div>
  );
};

export default PropertiesClient;
