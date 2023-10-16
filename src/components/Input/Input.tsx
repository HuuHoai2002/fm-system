"use client";

import classNames from "classnames";
import React from "react";
import WithScale from "../Transition/WithScale";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  label?: string;
  error?: boolean;
  ring?: boolean;
  color?: string;
  appendIcon?: React.ReactNode;
  prependIcon?: React.ReactNode;
  appendIconTransition?: boolean;
  prependIconTransition?: boolean;
  appendIconClick?: () => void;
  prependIconClick?: () => void;
  small?: boolean;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    className,
    fullWidth,
    label,
    error,
    ring,
    color,
    appendIcon,
    appendIconClick,
    prependIconClick,
    prependIcon,
    appendIconTransition = true,
    prependIconTransition = false,
    small,
    hint,
    ...rest
  } = props;

  return (
    <div
      className={classNames("relative ", {
        "w-full": fullWidth,
      })}
    >
      <input
        ref={ref}
        className={classNames(
          "rounded-md font-normal border outline-none border-gray-200 focus:border-blue-500 py-2 md:py-3 pl-3 pr-3 transition-all duration-200 text-gray-900 placeholder:text-gray-400 text-sm leading-6 appearance-none",
          className,
          {
            "!w-full": fullWidth,
            "!border-red-500 focus:!border-red-500": error,
            "!focus:outline-none focus:ring-2 focus:ring-offset-1": ring,
            "focus:ring-offset-blue-200 focus:ring-blue-300": ring && !error,
            "focus:ring-offset-red-200 focus:ring-red-300": ring && error,
            "!pr-10": appendIcon,
            "!pl-10": prependIcon,
            "!px-10": prependIcon && appendIcon,
            "!py-2 !pr-3": small,
          }
        )}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        {...rest}
      />
      {appendIcon && (
        <div
          className={classNames(
            "absolute right-2 top-2/4 -translate-y-2/4 w-6 h-6 flex items-center justify-center text-gray-400"
          )}
        >
          {appendIconTransition ? (
            <WithScale className="!rounded-full" onClick={appendIconClick}>
              {appendIcon}
            </WithScale>
          ) : (
            <div onClick={appendIconClick}>{appendIcon}</div>
          )}
        </div>
      )}
      {prependIcon && (
        <div
          className={classNames(
            "absolute left-2 top-2/4 -translate-y-2/4 w-6 h-6 flex items-center justify-center text-gray-400"
          )}
        >
          {prependIconTransition ? (
            <WithScale className="!rounded-full" onClick={prependIconClick}>
              {prependIcon}
            </WithScale>
          ) : (
            <div onClick={prependIconClick}>{prependIcon}</div>
          )}
        </div>
      )}
      {hint && <span className="opacity-80 text-xs">{hint}</span>}
    </div>
  );
});

export default React.memo(Input);

Input.displayName = "Input";
