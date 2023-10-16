"use client";

import React from "react";

type ScrollComponentHandle = {
  scrollIntoView: () => void;
};

export interface ScrollComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ScrollComponent = React.forwardRef<
  ScrollComponentHandle,
  ScrollComponentProps
>(({ children, ...props }, ref) => {
  const scrollRefComponent = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(
    ref,
    () => {
      return {
        scrollIntoView: () => {
          scrollRefComponent.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
      };
    },
    []
  );

  return (
    <div {...props} ref={scrollRefComponent}>
      {children}
    </div>
  );
});

export default React.memo(ScrollComponent);

ScrollComponent.displayName = "ScrollComponent";
