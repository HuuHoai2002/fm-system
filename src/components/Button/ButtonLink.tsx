"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ButtonLinkProps extends Omit<ButtonProps, "href"> {
  href: string;
  isRouter?: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  isDisabled,
  isRouter = true,
  onPress,
  ...props
}) => {
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    if (isDisabled) return;
    router.push(href);
  }, [href, isDisabled, router]);

  return isRouter ? (
    <Button
      {...props}
      onPress={(e) => {
        handleClick();
        onPress && onPress(e);
      }}
    />
  ) : (
    <Link href={href}>
      <Button {...props} />
    </Link>
  );
};

export default ButtonLink;
