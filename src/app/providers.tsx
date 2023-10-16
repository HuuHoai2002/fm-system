"use client";

import AuthLoading from "@/components/Loading/AuthLoading";
import { publicRoutes } from "@/config/app.config";
import { ReactQueryConfig } from "@/config/react-query.config";
import { useAuthStore } from "@/stores/use-auth-store";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar } from "next-nprogress-bar";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: ReactQueryConfig.staleTime,
        },
      },
    })
  );
  const [isAuthLoading, setIsAuthLoading] = React.useState(true);

  const router = useRouter();

  const { getMe, status } = useAuthStore();

  const pathname = usePathname();

  React.useEffect(() => {
    (async () => {
      if (!publicRoutes.includes(pathname)) {
        const response = await getMe();

        if (!response.success) {
          router.push("/login");
        }
      } else {
        setIsAuthLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMe, router]);

  React.useEffect(() => {
    switch (status) {
      case "loading": {
        setIsAuthLoading(true);
        break;
      }

      case "authenticated": {
        setIsAuthLoading(false);
        break;
      }

      case "unauthenticated": {
        setIsAuthLoading(false);
        break;
      }
    }
  }, [status]);

  const toastStyledColor = useMemo(
    () =>
      ({
        success: "bg-blue-400",
        error: "bg-red-400",
        info: "bg-gray-400",
        warning: "bg-orange-400",
        default: "bg-indigo-400",
        dark: "bg-white-400 font-gray-300",
      } as any),
    []
  );

  return (
    <QueryClientProvider client={client}>
      {isAuthLoading && <AuthLoading />}
      <NextUIProvider>{children}</NextUIProvider>
      <ToastContainer
        position="top-right"
        toastClassName={({ type }: any) =>
          toastStyledColor[type || "default"] +
          " relative flex px-3 py-4 !text-white rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() =>
          "text-sm font-medium !text-white flex items-center gap-x-3"
        }
        icon={false}
        autoClose={3000}
        hideProgressBar
        draggable={false}
        closeOnClick
        theme="light"
      />
      <AppProgressBar
        height="3px"
        color="#3b82f6"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
