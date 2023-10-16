import classNames from "classnames";
import React from "react";

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Center: React.FC<CenterProps> = ({ children, ...props }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center w-full",
        props.className
      )}
    >
      {children}
    </div>
  );
};

export default Center;
