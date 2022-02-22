import {
  Box,
  Input,
  useControllableState,
  BoxProps,
  InputGroup,
  InputProps, InputLeftElement
} from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'

export const SearchBar = ({
  value,
  onChange,
  boxProps,
  inputGroupProps,
  inputProps,
}: {
  value?: string;
  onChange?: (arg: string) => void;
  boxProps?: BoxProps;
  inputProps?: InputProps;
  inputGroupProps?: BoxProps;
}) => {
  const [v, oC] = useControllableState({ defaultValue: "", value, onChange});
  return (
    <Box w="100%" px={7} py={6} {...boxProps}>
      <InputGroup {...inputGroupProps}>
        <InputLeftElement pointerEvents='none' h={'100%'}>
          <Search2Icon color='gray.400'/>
        </InputLeftElement>
        <Input
          value={v}
          onChange={(e) => oC(e.target.value)}
          borderRadius="full"
          placeholder="Search"
          bg="gray.100"
          h={'100%'}
          {...inputProps}
        />
      </InputGroup>
    </Box>
  );
};
