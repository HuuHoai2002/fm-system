"use client";

import { IFormResponse } from "@/types/all";
import { IPagination } from "@/types/pagination";
import { Pagination } from "@nextui-org/react";
import React from "react";
import FormWrapper from "../Form/FormWrapper";
import FormResponseCard from "./FormResponseCard";

interface FormResponseListProps extends React.HTMLAttributes<HTMLDivElement> {
  pagination: IPagination;
  onPaginationChange: (page: number) => void;
  formResponses: IFormResponse[] | undefined;
  isLoading: boolean;
}

const FormResponseList: React.FC<FormResponseListProps> = ({
  formResponses,
  isLoading,
  onPaginationChange,
  pagination,
}) => {
  return (
    <FormWrapper
      isLoading={isLoading}
      isEmpty={formResponses?.length === 0}
      skeletonItems={6}
      cn={{
        grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        skeleton: "h-[133px]",
      }}
    >
      <div className="bg-white p-4 rounded-xl mb-4 flex flex-col w-full h-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formResponses &&
            formResponses.map((f) => <FormResponseCard data={f} key={f.id} />)}
        </div>
        <div className="mt-4 flex items-center justify-center w-full">
          {formResponses && (
            <Pagination
              aria-label="Forms-Pagination"
              isCompact
              showControls
              showShadow
              color="primary"
              page={pagination?.current_page}
              total={pagination?.total_pages}
              onChange={onPaginationChange}
            />
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default FormResponseList;
