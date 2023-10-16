"use client";

import useBoolean from "@/hooks/use-boolean";
import React from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Input from "./Input";

const InputPassword = React.forwardRef<HTMLInputElement>((props, ref) => {
  const { value, toggle } = useBoolean(false);

  return (
    <Input
      ref={ref}
      {...props}
      type={value ? "text" : "password"}
      appendIcon={value ? <HiEye /> : <HiEyeSlash />}
      appendIconClick={toggle}
    />
  );
});

export default InputPassword;

InputPassword.displayName = "InputPassword";
