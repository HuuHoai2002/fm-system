import { Metadata } from "next";
import React from "react";
import AccountsClient from "./AccountsClient";

export const metadata: Metadata = {
  title: "Tài khoản | FM System",
  description: "Tài khoản FM System",
};

export const dynamic = "force-dynamic";

const AccountsPage: React.FC = () => {
  return <AccountsClient />;
};

export default AccountsPage;
