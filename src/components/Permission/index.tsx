"use client";

import { Role } from "@/types/all";
import classNames from "classnames";
import React from "react";

interface PermissionProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: Role;
  mini?: boolean;
}

const Permission: React.FC<PermissionProps> = ({ role, mini, ...props }) => {
  return (
    <div
      className={classNames(
        "px-2 py-1 rounded-md select-none",
        {
          "bg-blue-100 text-blue-500": role === "ADMIN",
          "bg-purple-100 text-purple-500": role === "MANAGER",
          "bg-gray-100 text-gray-500": role === "USER",
        },
        props.className
      )}
    >
      <div className="flex items-center justify-center text-sm">
        <div className="text-sm font-medium">
          {role === "ADMIN" && "Quản trị viên"}
          {role === "MANAGER" && "Quản lý"}
          {role === "USER" && "Người dùng"}
        </div>
      </div>
    </div>
  );
};

export default Permission;
