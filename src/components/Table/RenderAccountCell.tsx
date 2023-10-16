"use client";

import { IUser } from "@/types/all";
import { User } from "@nextui-org/react";
import classNames from "classnames";
import React from "react";
import TableCell from "./TableCell";

interface RenderAccountCellProps extends React.HTMLAttributes<HTMLDivElement> {
  user: IUser;
  columnKey: React.Key;
}

const RenderAccountCell: React.FC<RenderAccountCellProps> = ({
  columnKey,
  user,
  ...props
}) => {
  switch (columnKey) {
    case "full_name": {
      return (
        <User description={user.email} name={user.full_name}>
          {user.email}
        </User>
      );
    }

    case "role": {
      return (
        <div
          className={classNames(
            "px-2 py-1 rounded-md select-none shrink-0",
            {
              "bg-blue-100 text-blue-500": user.role === "ADMIN",
              "bg-purple-100 text-purple-500": user.role === "MANAGER",
              "bg-gray-100 text-gray-500": user.role === "USER",
            },
            props.className
          )}
        >
          <div className="flex items-center justify-center shrink-0">
            <div className="text-sm font-medium">
              {user.role === "ADMIN" && "Quản trị viên"}
              {user.role === "MANAGER" && "Quản lý"}
              {user.role === "USER" && "Người dùng"}
            </div>
          </div>
        </div>
      );
    }
    case "department": {
      return (
        <TableCell cn={{ child: "font-medium !text-yellow-500" }}>
          {user?.department?.name ?? "Chưa có"}
        </TableCell>
      );
    }
    case "address": {
      return <TableCell>{user.address ?? "Chưa thêm"}</TableCell>;
    }
    case "phone": {
      return <TableCell>{user.phone ?? "Chưa thêm"}</TableCell>;
    }
  }
};

export default RenderAccountCell;
