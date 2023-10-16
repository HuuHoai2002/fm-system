"use client";

import React from "react";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  label?: string;
  error?: boolean;
  ring?: boolean;
  color?: string;
  appendIcon?: React.ReactNode;
  iconClick?: () => void;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    className,
    fullWidth,
    label,
    error,
    ring,
    color,
    appendIcon,
    iconClick,
    ...rest
  } = props;
  return (
    <div className="relative flex items-center">
      <input
        ref={ref}
        {...rest}
        className="relative float-left h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-blue-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-blue-500 checked:after:bg-blue-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-blue-500 checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-blue-500 dark:checked:after:border-blue-500 dark:checked:after:bg-blue-500 dark:checked:focus:border-blue-500"
        type="radio"
      />
      {label && (
        <div className="text-gray-700 inline-flex items-center font-medium gap-x-2 cursor-pointer text-sm lg:text-base">
          {label}
        </div>
      )}
    </div>
  );
});

export default Radio;

Radio.displayName = "Radio";
