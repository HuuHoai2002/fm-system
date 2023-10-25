import { IResponseProcess } from "@/types/all";
import { EFormResponseStatus } from "@/types/enums";
import { User } from "@nextui-org/react";
import classNames from "classnames";
import moment from "moment";
import React from "react";
import Swal from "sweetalert2";
import FormReponseStatusBadge from "./FormResponseStatusBadge";

interface FormResponseProcessCardProps {
  data: IResponseProcess;
  isActive?: boolean;
}

const FormResponseProcessCard: React.FC<FormResponseProcessCardProps> = ({
  data,
  isActive,
}) => {
  const {
    status,
    handling_officer,
    received_at,
    rejected_at,
    completed_at,
    form_processing_step,
    rejected_reason,
  } = data;

  const onShowRejectedReason = () => {
    Swal.fire({
      icon: "info",
      title: "Lý do từ chối",
      text: rejected_reason,
      confirmButtonText: "Đóng",
    });
  };

  return (
    <div>
      <div
        className={classNames(
          "w-full border border-gray-200 rounded-md shadow-sm p-4",
          {
            "bg-green-50 !border-green-500": isActive,
          }
        )}
      >
        <div className="flex flex-col gap-y-1 md:flex-row justify-between gap-x-6 select-none">
          <div className="flex-1">
            <div className="space-y-1">
              <div>
                <FormReponseStatusBadge status={status} />
              </div>
              <div className="flex items-center gap-x-2 text-sm">
                <span className="text-gray-800 shrink-0">Phòng ban xử lý:</span>
                <span className="font-medium text-blue-500 text-truncate-1 capitalize">
                  {form_processing_step.department.name}
                </span>
              </div>
              <div className="flex items-center gap-x-2 text-sm">
                <span className="text-gray-800 shrink-0">
                  Thời gian tiếp nhận:
                </span>
                <span className="font-medium text-green-500 text-truncate-1">
                  {moment(received_at).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
              {status === EFormResponseStatus.COMPLETED && (
                <div className="flex items-center gap-x-2 text-sm">
                  <span className="text-gray-800 shrink-0">
                    Thời gian hoàn thành xử lý:
                  </span>
                  <span className="font-medium text-blue-500 text-truncate-1">
                    {moment(completed_at).format("DD/MM/YYYY HH:mm:ss")}
                  </span>
                </div>
              )}
              {status === EFormResponseStatus.REJECTED && (
                <div className="space-y-1">
                  <div className="flex items-center gap-x-2 text-sm">
                    <span className="text-gray-800 shrink-0">
                      Thời gian từ chối:
                    </span>
                    <span className="font-medium text-orange-500 text-truncate-1">
                      {moment(rejected_at).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm">
                    <span className="text-gray-800 shrink-0">
                      Lý do từ chối:
                    </span>
                    <span className="font-medium text-orange-500 text-truncate-1">
                      <span
                        className="cursor-pointer hover:opacity-80"
                        onClick={onShowRejectedReason}
                      >
                        Xem lý do bị từ chối
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-[2px] bg-gray-200 h-auto"></div>

          <div className="flex-1">
            <div className="space-y-1">
              <div>
                <span className="font-medium text-sm">
                  Thông tin cán bộ xử lý
                </span>
              </div>
              {handling_officer ? (
                <User
                  name={handling_officer.full_name}
                  description={handling_officer.email}
                />
              ) : (
                <span className="font-medium text-gray-500 text-sm">
                  Chưa có thông tin
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResponseProcessCard;
