import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Không tìm thấy trang mà bạn yêu cầu",
};

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
