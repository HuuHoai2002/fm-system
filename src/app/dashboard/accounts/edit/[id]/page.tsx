import { Metadata } from "next";
import EditAccountClient from "./EditAccountClient";

export const metadata: Metadata = {
  title: "Cập nhật tài khoản | FM System",
  description: "Cập nhật tài khoản FM System",
};

export const dynamic = "force-dynamic";

const EditAccountPage: React.FC = () => {
  return <EditAccountClient />;
};

export default EditAccountPage;
