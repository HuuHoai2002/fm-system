import { Metadata } from "next";
import CreateAccountClient from "./CreateAccountClient";

export const metadata: Metadata = {
  title: "Tạo tài khoản | FM System",
  description: "Tạo tài khoản FM System",
};

export const dynamic = "force-dynamic";

const CreateAccountPage: React.FC = () => {
  return <CreateAccountClient />;
};

export default CreateAccountPage;
