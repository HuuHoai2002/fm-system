import React from "react";

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  rightContent?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  rightContent,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="flex items-center p-2 md:p-4 bg-white rounded-md">
        <div>
          <h2 className="font-bold text-base md:text-lg">{title}</h2>
        </div>
        {rightContent && <div className="ml-auto">{rightContent}</div>}
      </div>
    </div>
  );
};

export default DashboardHeader;
