import { RefObject, useState } from "react";

function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  elementRef.current?.addEventListener("mouseenter", handleMouseEnter);
  elementRef.current?.addEventListener("mouseleave", handleMouseLeave);

  return value;
}

export default useHover;
