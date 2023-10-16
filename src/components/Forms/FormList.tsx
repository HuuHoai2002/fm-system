"use client";

import { FORM_PATH } from "@/constants/paths";
import { IForm } from "@/types/all";
import { IPagination } from "@/types/pagination";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { HiDocumentPlus } from "react-icons/hi2";
import FormCard from "./FormCard";

interface FormListsProps extends React.HTMLAttributes<HTMLDivElement> {
  pagination: IPagination;
  onPaginationChange: (page: number) => void;
  forms: IForm[] | undefined;
  isLoading: boolean;
}

const FormLists: React.FC<FormListsProps> = ({
  forms,
  isLoading,
  onPaginationChange,
  pagination,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl mb-4 flex flex-col w-full h-full">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Link href={FORM_PATH + "/new"}>
          <div className="w-full h-full bg-white rounded-md p-2 md:p-4 border border-gray-200 hover:border-blue-500 transition-all flex items-center justify-center cursor-pointer">
            <HiDocumentPlus className="w-24 h-24 text-gray-400" />
          </div>
        </Link>
        {forms && forms.map((f) => <FormCard form={f} key={f.id} />)}
      </div>

      <div className="mt-4 flex items-center justify-center w-full">
        {forms && (
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
  );
};

export default FormLists;
