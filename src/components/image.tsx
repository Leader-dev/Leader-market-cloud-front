import NextImage from "next/image";
import { Avatar, AvatarProps, chakra } from "@chakra-ui/react";
import accessStartUrl from "services/image/accessStartUrl";
import { useQuery } from "react-query";

export const Image = chakra(NextImage, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) => {
    return [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
    ].includes(prop);
  },
});

export const UseImage = ({ src, ...props }: { src: string }) => {
  const { data: startUrl } = useQuery("startUrl", accessStartUrl({}));
  return <Image src={startUrl + src} {...props} />;
};

export const UserAvatar = ({
  src,
  children,
  ...props
}: AvatarProps & { src: string }) => {
  const { data: startUrl, isLoading } = useQuery(
    "startUrl",
    accessStartUrl({})
  );
  if (isLoading) return <Avatar {...props} />;
  return (
    <Avatar src={startUrl + src} {...props}>
      {children}
    </Avatar>
  );
};
