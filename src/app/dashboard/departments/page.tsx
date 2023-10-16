import { Metadata } from "next";
import DepartmentsClient from "./DepartmentsClient";

export const metadata: Metadata = {
  title: "Quản lý phòng ban | FM System",
  description: "Quản lý phòng ban FM System",
};

export const dynamic = "force-dynamic";

const DepartmentsPage: React.FC = () => {
  return <DepartmentsClient />;
};

export default DepartmentsPage;
