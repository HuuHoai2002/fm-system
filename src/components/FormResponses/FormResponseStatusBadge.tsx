import { EFormResponseStatus } from "@/types/enums";
import classNames from "classnames";

interface FormReponseStatusBadgeProps {
  status: EFormResponseStatus;
}

const FormReponseStatusBadge: React.FC<FormReponseStatusBadgeProps> = ({
  status,
}) => {
  return (
    <div>
      <div
        className={classNames(
          "px-2 py-1 inline rounded-md select-none shrink-0 leading-none text-xs font-medium",
          {
            "bg-blue-400 text-white": status === EFormResponseStatus.COMPLETED,
            "bg-orange-400 text-white": status === EFormResponseStatus.REJECTED,
            "bg-green-400 text-white":
              status === EFormResponseStatus.PROCESSING,
          }
        )}
      >
        {status === EFormResponseStatus.COMPLETED && "Đã hoàn thành"}
        {status === EFormResponseStatus.PROCESSING && "Đang xử lý"}
        {status === EFormResponseStatus.REJECTED && "Đã từ chối"}
      </div>
    </div>
  );
};

export default FormReponseStatusBadge;
