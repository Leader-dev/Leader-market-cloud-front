import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export const SiteLink: typeof Link = ({
  href,
  ...props
}: {
  href?: string;
}) => {
  return (
    <NextLink passHref href={href ?? "/"}>
      <Link {...props} />
    </NextLink>
  );
};
