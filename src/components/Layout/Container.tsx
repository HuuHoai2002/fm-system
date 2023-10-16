import classNames from "classnames";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <div
        className={classNames(
          "bg-white p-4 rounded-xl mb-4 w-full h-full min-h-[70vh]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
