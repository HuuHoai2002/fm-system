import { Metadata } from "next";
import React from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu | FM System",
  description: "Đặt lại mật khẩu tại FM System",
};

const ResetPasswordPage: React.FC = () => {
  return <ResetPasswordClient />;
};

export default ResetPasswordPage;
