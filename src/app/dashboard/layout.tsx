"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuthStore } from "@/stores/use-auth-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAuthStore();

  return (
    <div className="">
      <div>
        <Navbar />
        <Sidebar />
      </div>
      <div className="relative p-2 md:p-4 sm:ml-64 mt-[57px] lg:mt-[81px] min-h-[80vh]">
        {status === "authenticated" && children}
      </div>
    </div>
  );
}
