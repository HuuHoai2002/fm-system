import classNames from "classnames";
import React from "react";

interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  cn?: {
    cell?: string;
    child?: string;
  };
}

const TableCell: React.FC<TableCellProps> = ({ children, cn, ...props }) => {
  return (
    <div {...props} className={classNames("flex flex-col", cn?.cell)}>
      <p className={classNames("text-sm capitalize text-gray-700", cn?.child)}>
        {children}
      </p>
    </div>
  );
};

export default TableCell;
