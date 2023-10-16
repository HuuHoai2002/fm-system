import { Metadata } from "next";
import React from "react";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Quên mật khẩu | FM System",
  description: "Quên mật khẩu FM System",
};

const ForgotPasswordPage: React.FC = () => {
  return <ForgotPasswordClient />;
};

export default ForgotPasswordPage;
