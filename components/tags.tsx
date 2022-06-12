import { Box } from "@chakra-ui/react";

export const Tags = ({ tags }: { tags: string[] }) => (
  <Box color="gray.600">{tags.join(" / ")}</Box>
);
