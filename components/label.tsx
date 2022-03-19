import {BoxProps, Flex} from "@chakra-ui/react";

export const Label: React.FC<BoxProps> = ({children, ...props}) => (
  <Flex
    p={"1px 25px"}
    color={"#003DB1"}
    border={'1px'}
    borderColor={"currentColor"}
    borderRadius={'8px'}
    align={"center"}
    {...props}
  >
    {children}
  </Flex>
);
