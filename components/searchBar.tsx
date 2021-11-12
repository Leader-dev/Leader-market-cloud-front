import {
  Box,
  Input,
  useControllableState,
  BoxProps,
  InputProps,
} from "@chakra-ui/react";

export const SearchBar = ({
  value,
  onChange,
  boxProps,
  inputProps,
}: {
  value?: string;
  onChange?: (arg: string) => void;
  boxProps?: BoxProps;
  inputProps?: InputProps;
}) => {
  const [v, oC] = useControllableState({ defaultValue: "", value, onChange });
  return (
    <Box w="100%" px={7} py={6} {...boxProps}>
      <Input
        value={v}
        onChange={(e) => oC(e.target.value)}
        borderRadius="full"
        placeholder="Search"
        bg="gray.100"
        {...inputProps}
      />
    </Box>
  );
};
