"use client";

import classNames from "classnames";
import React, { useId } from "react";
import { Control, useController } from "react-hook-form";
import { InputProps } from "./Input";

interface InputControlProps extends InputProps {
  control?: Control<any>;
  name: string;
  component?: React.ReactNode;
  row?: boolean;
}

const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  ({ name, control, component, color, label, row = false, ...props }, ref) => {
    const { field } = useController({
      name,
      control: control,
      defaultValue: "",
    });

    const _id = useId();

    return (
      <div
        className={classNames("relative", {
          "flex items-center gap-x-1": row,
        })}
      >
        {!row && label && (
          <InputLabel
            id={_id}
            label={label}
            control={control}
            className="mb-1"
          />
        )}
        {React.Children.map(component, (child) => {
          return React.cloneElement(child as React.ReactElement, {
            id: _id,
            ...props,
            ...field,
          });
        })}
        {row && label && (
          <InputLabel id={_id} label={label} control={control} />
        )}
      </div>
    );
  }
);

export default InputControl;

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  control?: Control<any>;
  id: string;
}

export const InputLabel: React.FC<InputLabelProps> = React.memo(
  ({ id, label, control, className, ...props }) => {
    return (
      <label
        htmlFor={id}
        className={classNames(
          "select-none text-gray-700 inline-flex items-center font-medium gap-x-2 cursor-pointer text-sm",
          className
        )}
        {...props}
      >
        {label}
        {control && <span className="text-red-500 leading-none h-2">*</span>}
      </label>
    );
  }
);

InputControl.displayName = "InputControl";

InputLabel.displayName = "InputLabel";
