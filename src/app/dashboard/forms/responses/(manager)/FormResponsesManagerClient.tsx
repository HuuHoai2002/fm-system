"use client";

import FormResponseList from "@/components/FormResponses/FormResponseList";
import QueryFilter from "@/components/QueryFilter";
import { getAllFormResponseByStatus } from "@/services/form-response.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface FormResponseManagerClientProps {
  status: "processings" | "processed" | "rejects";
}

const FormResponseManagerClient: React.FC<FormResponseManagerClientProps> = ({
  status,
}) => {
  const [query, setQuery] = React.useState<string>("");

  const { data: formResponses, isFetching } = useQuery({
    queryKey: [`form_response_${status}`, query],
    queryFn: () => getAllFormResponseByStatus(status, query),
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
          limit: 10,
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

export default FormResponseManagerClient;
