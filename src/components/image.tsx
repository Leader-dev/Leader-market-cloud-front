import NextImage, { ImageProps } from "next/image";
import { Avatar, AvatarProps, Box, chakra, Tag, Img } from "@chakra-ui/react";
import accessStartUrl from "services/image/accessStartUrl";
import { useTranslation } from "next-i18next";
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
      "objectFit",
      "blurDataURL",
      "layout",
      // "loader",
      "priority",
    ].includes(prop);
  },
});

const myLoader = ({ src }: { src: string }) => {
  return `https://leader-static-test.oss-cn-shenzhen.aliyuncs.com/${src}`;
};

export const UseImage = ({ src, ...props }: ImageProps & { src: string }) => {
  const startUrl = "https://leader-static-test.oss-cn-shenzhen.aliyuncs.com/";
  return <Img src={startUrl + src} alt={src} {...props} />;
};

export const UserAvatar = ({
  src,
  children,
  ...props
}: AvatarProps & { src: string }) => {
  const startUrl = "https://leader-static-test.oss-cn-shenzhen.aliyuncs.com/";
  return (
    <Avatar src={startUrl + src} {...props}>
      {children}
    </Avatar>
  );
};

export const OrgAvatar = ({
  certification,
  showTag = true,
  src,
  ...props
}: AvatarProps & {
  certification: "student_org" | "social_org" | "school" | "";
  showTag?: boolean;
  src: string;
}) => {
  let bgGradient = undefined;
  if (certification === "student_org") {
    bgGradient = "linear(45deg, #496DE9, #9067EB)";
  } else if (certification === "social_org") {
    bgGradient = "linear(45deg, #EF9506, #D15000)";
  } else if (certification === "school") {
    bgGradient = "linear(45deg, #42B290, #008D3C)";
  }

  const { t } = useTranslation("common", { keyPrefix: "org_certification" });

  return (
    <>
      <UserAvatar
        src={src}
        bgGradient={bgGradient}
        p={bgGradient ? "3px" : 0}
        {...props}
      />
      {showTag && certification !== "" && (
        <Box mt={2}>
          <Tag
            borderRadius="full"
            bgGradient={bgGradient}
            px={4}
            py={1}
            color="white"
            s
          >
            {t(certification)}
          </Tag>
        </Box>
      )}
    </>
  );
};
