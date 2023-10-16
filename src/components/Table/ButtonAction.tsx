import classNames from "classnames";
import React from "react";

interface ButtonActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  children: React.ReactNode;
  type?: "detail" | "update" | "delete";
}

const ButtonAction: React.FC<ButtonActionProps> = ({
  children,
  type,
  ...props
}) => {
  let classNameColors = "";

  switch (type) {
    case "detail": {
      classNameColors = "bg-green-50 hover:bg-green-400 text-green-400";
      break;
    }
    case "update": {
      classNameColors = "bg-blue-50 hover:bg-blue-400 text-blue-400";
      break;
    }
    case "delete": {
      classNameColors = "bg-red-50 hover:bg-red-400 text-red-400";
      break;
    }
  }

  return (
    <div
      className={classNames(
        "relative p-2 rounded-md bg-blue-50  active:scale-[0.95] transition-all hover:text-white flex items-center justify-center cursor-pointer select-none",
        classNameColors
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ButtonAction;
