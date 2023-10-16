"use client";

import { useFormResponseContext } from "@/contexts/FormResponse/FormResponseProvider";
import { IFormResponse } from "@/types/all";
import { User } from "@nextui-org/react";
import moment from "moment";
import React from "react";
import FormReponseStatusBadge from "./FormResponseStatusBadge";

interface FormResponseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: IFormResponse;
}

const FormResponseCard: React.FC<FormResponseCardProps> = ({ data }) => {
  const { handleOpen } = useFormResponseContext();

  return (
    <div>
      <div className="w-full bg-white rounded-md pb-2 px-2 md:px-4 border border-gray-200 hover:border-blue-500 transition-all cursor-pointer">
        <div onClick={() => handleOpen(data.id)}>
          <div className="py-2 flex flex-col w-full gap-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-base capitalize text-truncate-1">
                {data.form.name}
              </h3>
              <div></div>
            </div>

            {/* <div>
              <div className="flex items-center gap-x-2 text-sm mb-[1px]">
                <span className="">Đơn vị tiếp nhận: </span>
                <span className="font-medium text-gray-800">
                  Phòng Kinh Doanh
                </span>
              </div>
            </div> */}

            <div className="flex items-center justify-between">
              <FormReponseStatusBadge status={data.status} />
              <span className="text-xs">
                {moment(data.created_at).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center pb-3 border-t border-gray-300"></div>

          <div className="">
            <User
              name={data.account.full_name}
              description={data.account.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResponseCard;
