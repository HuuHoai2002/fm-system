"use client";

import classNames from "classnames";
import React from "react";
import { HiCheck } from "react-icons/hi";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  label?: string;
  error?: boolean;
  ring?: boolean;
  color?: string;
  appendIcon?: React.ReactNode;
  iconClick?: () => void;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      className,
      fullWidth,
      label,
      error,
      ring,
      color,
      appendIcon,
      iconClick,
      checked,
      ...rest
    } = props;

    return (
      <label className="relative flex items-center group cursor-pointer">
        <input
          ref={ref}
          {...rest}
          type="checkbox"
          checked={checked}
          className="hidden group"
        />
        <div
          className={classNames(
            "relative flex items-center justify-center text-lg w-5 h-5 lg:w-6 lg:h-6 transition-all duration-200 border rounded-md flex-none text-white",
            {
              "!border-red-500": error,
              "bg-blue-500": props.checked,
            }
          )}
        >
          <HiCheck size={24} />
        </div>
        {label && (
          <div className="text-gray-700 inline-flex items-center font-medium gap-x-2 cursor-pointer text-sm lg:text-base">
            {label}
          </div>
        )}
      </label>
    );
  }
);

export default CheckBox;

CheckBox.displayName = "CheckBox";
