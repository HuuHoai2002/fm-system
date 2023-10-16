"use client";

import { FixturePropertyType } from "@/lib/utils";
import { IProperty } from "@/types/all";
import moment from "moment";
import React from "react";
import TableCell from "./TableCell";

interface RenderPropertyTableCellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "property"> {
  property: IProperty;
  columnKey: React.Key;
}

const RenderPropertyTableCell: React.FC<RenderPropertyTableCellProps> = ({
  columnKey,
  property,
  ...props
}) => {
  switch (columnKey) {
    case "name": {
      return (
        <TableCell cn={{ child: "font-medium" }}>
          {property?.name ?? "Chưa có"}
        </TableCell>
      );
    }
    case "description": {
      return <TableCell>{property?.description ?? "Chưa có"}</TableCell>;
    }
    case "is_multiple": {
      return (
        <TableCell>
          {property?.is_multiple ? "Nhiều" : "Một / Điền một" ?? "Chưa có"}
        </TableCell>
      );
    }
    case "property_type": {
      return (
        <TableCell cn={{ child: "font-medium !text-blue-500" }}>
          {FixturePropertyType.find((i) => i.value === property?.property_type)
            ?.label ?? "Chưa có"}
        </TableCell>
      );
    }
    case "created_at": {
      return (
        <TableCell>
          {moment(property.created_at).format("DD/MM/YYYY, HH:mm:ss") ??
            "Chưa có"}
        </TableCell>
      );
    }
    case "updated_at": {
      return (
        <TableCell>
          {moment(property.updated_at).format("DD/MM/YYYY, HH:mm:ss") ??
            "Chưa có"}
        </TableCell>
      );
    }
  }
};

export default RenderPropertyTableCell;
