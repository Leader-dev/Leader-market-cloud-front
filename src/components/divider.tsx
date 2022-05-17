import { Box, BoxProps } from "@chakra-ui/react";

export const Divider: React.FC<BoxProps & { vertical?: boolean }> = ({
  vertical = false,
  color = "gray.700",
  ...props
}) => (
  <Box {...props}>
    <Box
      bgColor={color}
      {...(vertical ? { w: "2px", h: "100%" } : { w: "100%", h: "2px" })}
    />
  </Box>
);
