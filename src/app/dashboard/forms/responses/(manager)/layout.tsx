"use client";

import { FormResponseProvider } from "@/contexts/FormResponse/FormResponseProvider";
import useAuth from "@/hooks/use-auth";
import { Role } from "@/types/all";
import { notFound } from "next/navigation";

export default function FormResponseDashboardManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAuth({
    roles: [Role.MANAGER],
    onForbidden: {
      callback: () => {
        notFound();
      },
    },
  });

  return (
    <div className="">
      {status === "authenticated" && (
        <FormResponseProvider>{children}</FormResponseProvider>
      )}
    </div>
  );
}
