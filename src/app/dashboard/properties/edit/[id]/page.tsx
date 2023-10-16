import { Metadata } from "next";
import EditPropertyClient from "./EditPropertyClient";

export const metadata: Metadata = {
  title: "Cập nhật thuộc tính | FM System",
  description: "Cập nhật thuộc tính FM System",
};

export const dynamic = "force-dynamic";

const EditPropertyPage: React.FC = () => {
  return <EditPropertyClient />;
};

export default EditPropertyPage;
