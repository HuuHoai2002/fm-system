import classNames from "classnames";
import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";

interface HintProps extends React.HTMLAttributes<HTMLDivElement> {
  basic?: boolean;
}

const Hint: React.FC<HintProps> = ({
  children,
  className,
  basic = true,
  ...props
}) => {
  return (
    <div
      className={classNames(
        "w-full flex items-center justify-between relative",
        className
      )}
      {...props}
    >
      {!basic && (
        <div className="flex-1 p-3 md:p-4 w-full bg-blue-50 space-y-1 rounded-md">
          <HiOutlineLightBulb className="text-yellow-500" size={24} />
          <div>
            <p className="text-sm text-gray-800">{children}</p>
          </div>
        </div>
      )}
      {basic && (
        <p className="text-[13px] leading-5 text-gray-700 mt-[2px]">
          {children}
        </p>
      )}
    </div>
  );
};

export default Hint;
