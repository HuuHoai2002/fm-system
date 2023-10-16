import classNames from "classnames";
import React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {}

const Alert: React.FC<AlertProps> = ({ children, className, ...props }) => {
  return (
    <div>
      <div
        className={classNames(
          "w-full p-2 rounded-md border border-green-400 bg-green-50 flex items-center justify-center text-green-400 text-sm",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Alert;
