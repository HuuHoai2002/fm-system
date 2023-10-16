import Logo from "@/components/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xác thực | FM System",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <header className="w-full bg-white fixed top-0 justify-center text-black1 z-50 border-b border-gray-200">
        <div className="h-14 lg:h-20 flex w-full items-center justify-between md:gap-x-4 lg:gap-x-8 px-2 md:px-4 lg:px-5">
          <Logo appName="FM System" />
        </div>
      </header>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-[500px]">{children}</div>
      </div>
    </div>
  );
}
