"use client";

import classNames from "classnames";
import React from "react";

interface FormGroupProps {
  children: React.ReactNode;
  errorMessages?: string | undefined;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, errorMessages }) => {
  return (
    <div>
      {children}
      {errorMessages && (
        <span className={classNames("text-xs lg:text-sm text-red-500")}>
          {errorMessages}
        </span>
      )}
    </div>
  );
};

export default FormGroup;

FormGroup.displayName = "FormGroup";
