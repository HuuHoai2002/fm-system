import { Spinner } from "@nextui-org/react";
import React from "react";

interface TableStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "error" | "loading" | "success";
}

const TableStatus: React.FC<TableStatusProps> = ({
  status,
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="w-full">
        {status === "error" && (
          <div className="flex items-center justify-center">
            <div className="text-red-500">Đã xảy ra lỗi</div>
          </div>
        )}
        {status === "loading" && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {status !== "error" && children}
      </div>
    </div>
  );
};

export default TableStatus;
