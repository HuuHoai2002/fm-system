import { Metadata } from "next";
import React from "react";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Đăng nhập | FM System",
  description: "Đăng nhập vào hệ thống FM System",
};

const Login: React.FC = () => {
  return <LoginClient />;
};

export default Login;
