import React from "react";

interface TableTopContentProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const TableTopContent: React.FC<TableTopContentProps> = ({
  children,
  disabled,
  ...props
}) => {
  return (
    <div {...props} className="w-full flex">
      <div className="ml-auto">{children}</div>
    </div>
  );
};

export default TableTopContent;
