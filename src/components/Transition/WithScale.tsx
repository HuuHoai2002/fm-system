import classNames from "classnames";
import React from "react";

interface WithScaleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  dark?: boolean;
  customClass?: string;
  disabledScale?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "md";
}

const WithScale: React.FC<WithScaleProps> = React.memo(
  ({ children, dark, disabledScale, size, ...props }) => {
    const onClickHandler = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (props.onClick && !props.disabled) {
        props.onClick(e);
      }
    };

    return (
      <div
        {...props}
        className={classNames(
          "relative select-none inline-flex items-center justify-center text-inherit p-2 rounded-md cursor-pointer hover:bg-gray-200 active:bg-gray-300 duration-150 border border-transparent",
          props.className,
          {
            "text-white bg-gray-900 hover:!bg-gray-800 active:!bg-black": dark,
            "transform active:scale-95 !transition-transform":
              !disabledScale && !props.disabled,
            "opacity-50 !cursor-not-allowed": props.disabled,
            "!p-1 text-xs": size === "xs",
            "!p-[6px] text-sm": size === "sm",
            "!p-2 text-base": size === "md",
          }
        )}
        onClick={onClickHandler}
      >
        {children}
      </div>
    );
  }
);

export default WithScale;

WithScale.displayName = "WithScale";
