import {
  Flex,
  FormControl,
  FormLabel,
  Switch as Swt,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";

export const Switch = ({
  name,
  label,
  activeLabel,
  inactiveLabel,
}: {
  name: string;
  label?: string;
  activeLabel: string;
  inactiveLabel: string;
}) => {
  const [field, meta, { setValue }] = useField(name);
  return (
    <FormControl>
      {label && <FormLabel> {label} </FormLabel>}
      <Flex align="center" mb={4}>
        <Text color={field.value === "inactive" ? "black" : "gray.400"}>
          {inactiveLabel}
        </Text>
        <Swt
          defaultChecked={true}
          mx={2}
          sx={{ "--switch-track-width": "3rem" }}
          onChange={(e) => setValue(e.target.checked ? "active" : "inactive")}
        />
        <Text color={field.value === "active" ? "black" : "gray.400"}>
          {activeLabel}
        </Text>
      </Flex>
    </FormControl>
  );
};
