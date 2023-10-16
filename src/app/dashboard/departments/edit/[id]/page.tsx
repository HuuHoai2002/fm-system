import { Metadata } from "next";
import EditDepartmentClient from "./EditDepartmentClient";

export const metadata: Metadata = {
  title: "Cập nhật tài khoản | FM System",
  description: "Cập nhật tài khoản FM System",
};

export const dynamic = "force-dynamic";

const EditDepartmentPage: React.FC = () => {
  return <EditDepartmentClient />;
};

export default EditDepartmentPage;
