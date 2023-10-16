import { Metadata } from "next";
import CreatePropertyClient from "./CreatePropertyClient";

export const metadata: Metadata = {
  title: "Tạo thuộc tính | FM System",
  description: "Tạo thuộc tính FM System",
};

export const dynamic = "force-dynamic";

const CreatePropertyPage: React.FC = () => {
  return <CreatePropertyClient />;
};

export default CreatePropertyPage;
