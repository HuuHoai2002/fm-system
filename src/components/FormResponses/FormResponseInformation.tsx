"use client";

import { IFormResponseDetail } from "@/types/all";
import moment from "moment";
import React from "react";
import FormResponsePreviewSteps from "./FormResponsePreviewSteps";
import FormReponseStatusBadge from "./FormResponseStatusBadge";
import FormReponseWrapper from "./FormResponseWrapper";

interface FormResponseInformationProps {
  data: IFormResponseDetail;
}

const FormResponseInformation: React.FC<FormResponseInformationProps> = ({
  data,
}) => {
  const [showStepView, setShowStepView] = React.useState(false);

  const { form, account, code, status, processes, updated_at, created_at } =
    data;

  return (
    <div>
      <FormReponseWrapper title="Thông Tin Chung">
        <div className="flex flex-col gap-y-1 md:flex-row justify-between gap-x-6 select-none">
          <div className="flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">Mã đơn:</span>
                <span className="font-medium text-slate-800 text-truncate-1">
                  #{code}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">
                  Thông tin người nộp:
                </span>
                <span className="font-medium text-blue-500 text-truncate-1">
                  {account.full_name} - {account.email}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">
                  Trạng thái mẫu đơn:
                </span>
                <FormReponseStatusBadge status={status} />
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">
                  Thời gian gửi mẫu đơn:
                </span>
                <span className="font-medium text-gray-900 text-truncate-1">
                  {moment(created_at).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">
                  Cập nhật lần cuối:
                </span>
                <span className="font-medium text-gray-900 text-truncate-1">
                  {moment(updated_at).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">Tên mẫu đơn:</span>
                <span className="font-medium text-gray-900 text-truncate-1">
                  {form.name}
                </span>
              </div>

              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">Mô tả mẫu đơn:</span>
                <span
                  className="font-medium text-gray-900 text-truncate-1"
                  title={form.description}
                >
                  {form.description}
                </span>
              </div>

              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">
                  Thời gian xử lý (dự kiến):
                </span>
                <span className="font-medium text-gray-900">
                  {form.processing_time} ngày
                </span>
              </div>

              <div className="flex items-center gap-x-2">
                <span className="text-gray-800 shrink-0">
                  Tổng số bước xử lý:
                </span>
                <span className="font-medium text-gray-900">
                  {form.processing_steps.length} bước {"   "}
                  <span className="text-blue-500 font-medium text-sm">
                    <span
                      onClick={() => setShowStepView(!showStepView)}
                      className="cursor-pointer"
                    >
                      ({showStepView ? "Ẩn" : "Xem chi tiết"})
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {showStepView && (
          <div className="py-2">
            <FormResponsePreviewSteps steps={form.processing_steps} />
          </div>
        )}
      </FormReponseWrapper>
    </div>
  );
};

export default FormResponseInformation;
