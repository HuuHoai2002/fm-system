import classNames from "classnames";
import React from "react";

interface WithRingProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const WithRing: React.FC<WithRingProps> = React.memo(
  ({ children, ...props }) => {
    return (
      <button
        {...props}
        className={classNames(
          "border-none outline-none p-2 md:p-3 rounded-full inline-flex items-center justify-center hover:bg-secondary transition ease-in duration-150 focus:ring-secondary focus:bg-secondary focus:ring-offset-black focus:outline-none focus:ring-2 focus:ring-offset-2",
          props.className
        )}
      >
        {children}
      </button>
    );
  }
);

export default WithRing;

WithRing.displayName = "WithRing";
