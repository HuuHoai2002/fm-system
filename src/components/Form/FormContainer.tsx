"use client";

import classNames from "classnames";
import React from "react";

interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = React.memo(
  ({ children, ...props }) => {
    return (
      <div
        {...props}
        className={classNames(
          "w-full flex flex-col gap-y-4 justify-start p-3 md:p-6 bg-white rounded-md",
          props.className
        )}
      >
        {children}
      </div>
    );
  }
);

export default FormContainer;

FormContainer.displayName = "FormContainer";
