import { appLinks } from "@/config/app.config";
import { IAuthStatus, useAuthStore } from "@/stores/use-auth-store";
import { IUser, Role } from "@/types/all";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

interface UseAuthArgs {
  roles: Role[];
  onForbidden?: {
    redirect?: string;
    callback?: () => void;
  };
  onAuthorized?: () => void;
}

interface UseAuthReturn {
  isAuthorized: boolean;
  isForbidden: boolean;
  user: IUser | null;
  status: IAuthStatus;
}

const useAuth = (options: UseAuthArgs): UseAuthReturn => {
  const { roles, onForbidden, onAuthorized } = options || {};

  const { status, user } = useAuthStore();
  const router = useRouter();

  const isAuthorized = (user && roles.includes(user?.role)) || false;
  const isForbidden = (user && !roles.includes(user?.role)) || false;

  const trigger = useCallback(() => {
    // if (!user) {
    //   window.location.href = appLinks.login;
    // }

    if (isForbidden) {
      if (onForbidden?.redirect) {
        router.push(onForbidden.redirect || appLinks.home);
      }

      onForbidden?.callback?.();
    }

    if (isAuthorized) {
      if (onAuthorized) {
        onAuthorized();
      }
    }
  }, [isForbidden, isAuthorized, onForbidden, router, onAuthorized]);

  useEffect(() => {
    trigger();
  }, [status, user, trigger]);

  return {
    isAuthorized,
    isForbidden,
    user,
    status,
  };
};

export default useAuth;
