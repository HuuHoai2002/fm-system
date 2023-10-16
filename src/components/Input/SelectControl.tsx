"use client";

import useClickOutside from "@/hooks/use-click-outside";
import classNames from "classnames";
import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import WithScale from "../Transition/WithScale";

export type SelectOption = {
  id?: string;
  value: string;
  label: string;
};

export interface SelectControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  fullWidth?: boolean;
  error?: boolean;
  ring?: boolean;
  color?: string;
  appendIcon?: React.ReactNode;
  appendIconTransition?: boolean;
  appendIconClick?: () => void;
  small?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  onClear?: () => void;
  selectedValues?: string[];
}

const SelectControl = React.forwardRef<HTMLInputElement, SelectControlProps>(
  (props, ref) => {
    const {
      name,
      className,
      fullWidth,
      error,
      ring,
      color,
      appendIcon,
      appendIconClick,
      appendIconTransition = false,
      small,
      onChange,
      defaultValue,
      options,
      onClear,
      selectedValues,
      ...rest
    } = props;

    const [isSelected, setIsSelected] = React.useState<SelectOption>();
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    useClickOutside(selectRef, () => setIsFocused(false));

    React.useEffect(() => {
      if (defaultValue) {
        if (options.findIndex((o) => o.value === defaultValue) === -1) {
          console.warn(`
          [Select] The defaultValue prop is not found in the options array.
        `);

          return;
        }
        const defaultIndexSelected = options.findIndex(
          (o) => o.value === defaultValue
        );

        setIsSelected(options[defaultIndexSelected]);

        if (onChange) {
          onChange(options[defaultIndexSelected].value);
        }
      } else {
        setIsSelected(undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const handleSelectOption = (selectedItem: SelectOption) => {
      setIsSelected(selectedItem);

      if (onChange && !selectedValues?.includes(selectedItem.value)) {
        onChange(selectedItem.value);
      }

      setIsFocused(false);
    };

    return (
      <div
        className={classNames("relative inline-block", {
          "w-full block": fullWidth,
        })}
        ref={selectRef}
      >
        <input
          ref={ref}
          className={classNames(
            "flex rounded-md select-none cursor-pointer font-normal border outline-none border-gray-200 focus:border-blue-500 py-2 md:py-3 pl-3 pr-3 transition-all duration-200 text-gray-900 placeholder:text-gray-400 text-sm leading-6 appearance-none",
            className,
            {
              "!w-full": fullWidth,
              "!border-red-500 focus:!border-red-500": error,
              "!focus:outline-none focus:ring-2 focus:ring-offset-1": ring,
              "focus:ring-offset-blue-200 focus:ring-blue-300": ring && !error,
              "focus:ring-offset-red-200 focus:ring-red-300": ring && error,
              "!pr-10": appendIcon,
              "!py-2 !pr-3": small,
            }
          )}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onClick={() => setIsFocused((f) => !f)}
          readOnly
          {...rest}
          value={isSelected?.label || ""}
        />
        {
          <div>
            {isFocused && (
              <div
                className={classNames(
                  "absolute w-full z-[100] bg-white rounded-md border-t border-l border-r border-gray-200 shadow-sm overflow-y-scroll scrollbar-select transition-all duration-200 max-h-40 mt-[1px]"
                )}
              >
                {options.map((option) => (
                  <div
                    key={option.id || option.value}
                    className={classNames(
                      "py-2 px-3 text-sm leading-6 cursor-pointer transition-all duration-200 hover:bg-gray-100",
                      {
                        "text-blue-500": option.value === isSelected?.value,
                        "text-gray-900": option.value !== isSelected?.value,
                        "!select-none !cursor-not-allowed opacity-80":
                          selectedValues?.includes(option.value),
                      }
                    )}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        }
        {appendIcon && (
          <div
            className={classNames(
              "absolute left-2 top-2/4 -translate-y-2/4 w-6 h-6 flex items-center justify-center text-gray-400"
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
        <div
          className={classNames(
            "absolute right-2 top-2/4 -translate-y-2/4 w-6 h-6 flex items-center justify-center text-gray-400 cursor-pointer"
          )}
          onClick={() => setIsFocused((f) => !f)}
        >
          {isFocused ? <HiChevronUp size={18} /> : <HiChevronDown size={18} />}
        </div>
      </div>
    );
  }
);

export default React.memo(SelectControl);

SelectControl.displayName = "Input";
