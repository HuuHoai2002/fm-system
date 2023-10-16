import classNames from "classnames";
import React from "react";

interface BasicStatisticProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  icon?: React.ReactNode;
  content: string | number;
}

const BasicStatistic: React.FC<BasicStatisticProps> = ({
  title,
  content,
  icon,
}) => {
  return (
    <div className={classNames("p-5 rounded-md bg-white")}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h3>
            <span className="text-lg md:text-xl font-semibold text-gray-900">
              {content}
            </span>
          </h3>
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        <div className="">{icon && icon}</div>
      </div>
    </div>
  );
};

export default BasicStatistic;
