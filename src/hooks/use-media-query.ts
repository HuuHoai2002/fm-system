import { BreakPoints } from "@/styles/breakpoints";
import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = (): void => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

interface MediaQuery {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useMediaQueryContext = (): MediaQuery => {
  const isMobile = useMediaQuery(BreakPoints.mobile.mediaQuery);
  const isTablet = useMediaQuery(BreakPoints.tablet.mediaQuery);
  const isDesktop = useMediaQuery(BreakPoints.desktop.mediaQuery);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
