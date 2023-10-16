"use client";

import classNames from "classnames";
import { isNumber } from "lodash";
import React from "react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const InputNumber: React.FC<InputNumberProps> = React.memo(
  ({
    className,
    value,
    setValue,
    step = 1,
    min = 1,
    max = 100,
    defaultValue,
    ...props
  }) => {
    const [innerValue, setInnerValue] = React.useState<string>(
      defaultValue?.toString() || min.toString() || ""
    );

    const parseInnerValue = React.useMemo(
      () => parseInt(innerValue),
      [innerValue]
    );

    React.useEffect(() => {
      if (parseInnerValue > max || parseInnerValue < min) {
        return;
      }

      if (isNumber(parseInnerValue)) {
        setValue(parseInnerValue);
      }
    }, [parseInnerValue, setValue, min, max]);

    return (
      <div
        className={classNames(
          "inline-flex items-center h-8 md:h-9 rounded-md select-none",
          className
        )}
      >
        <div
          className={classNames(
            "flex h-full items-center justify-center border border-gray-200 px-4 md:px-6 select-none cursor-pointer text-gray-500 rounded-l-md",
            {
              "opacity-40 pointer-events-none":
                props.disabled || props.readOnly || parseInnerValue <= min,
              "hover:bg-gray-100 active:bg-gray-200":
                !props.disabled && !props.readOnly && parseInnerValue > min,
            }
          )}
          onClick={() => {
            if (!props.disabled && !props.readOnly && parseInnerValue > min) {
              setInnerValue((prev) => (parseInt(prev) - step).toString());
            }
          }}
        >
          <HiOutlineMinusSm size={24} />
        </div>
        <input
          type="text"
          inputMode="decimal"
          className="outline-none h-full block text-center rounded-none border-y border-gray-200 max-w-[60px] md:max-w-[90px] focus:!border focus:border-blue-500 transition-all duration-200 appearance-none"
          {...props}
          value={innerValue}
          maxLength={5}
          onChange={(e) => {
            const { value } = e.target;

            if (value === "") {
              setInnerValue("");
            }

            const regex = /^[0-9\b]+$/;

            if (regex.test(value)) {
              setInnerValue(value);
            }
          }}
          onBlur={() => {
            if (!parseInnerValue || parseInnerValue < min) {
              setInnerValue(defaultValue?.toString() || min.toString());
            }

            if (parseInnerValue > max) {
              setInnerValue(max.toString());
            }

            if (parseInnerValue < min) {
              setInnerValue(min.toString());
            }
          }}
        />
        <div
          className={classNames(
            "flex h-full items-center justify-center border text-gray-500 border-gray-200 px-4 md:px-6 select-none cursor-pointer rounded-r-md",
            {
              "opacity-40 cursor-not-allowed":
                props.disabled || props.readOnly || parseInnerValue >= max,
              "hover:bg-gray-100 active:bg-gray-200":
                !props.disabled && !props.readOnly && parseInnerValue < max,
            }
          )}
          onClick={() => {
            if (!props.disabled && !props.readOnly && parseInnerValue < max) {
              setInnerValue((prev) => (parseInt(prev) + step).toString());
            }
          }}
        >
          <HiOutlinePlusSm size={24} />
        </div>
      </div>
    );
  }
);

export default InputNumber;

InputNumber.displayName = "InputNumber";
