"use client";

import { IDepartment } from "@/types/all";
import React from "react";
import TableCell from "./TableCell";

interface RenderDepartmentTableCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  department: IDepartment;
  columnKey: React.Key;
}

const RenderDepartmentTableCell: React.FC<RenderDepartmentTableCellProps> = ({
  columnKey,
  department,
  ...props
}) => {
  switch (columnKey) {
    case "name": {
      return (
        <TableCell cn={{ child: "font-medium" }}>
          {department?.name ?? "Chưa có"}
        </TableCell>
      );
    }
    case "description": {
      return <TableCell>{department?.description ?? "Chưa có"}</TableCell>;
    }
  }
};

export default RenderDepartmentTableCell;
