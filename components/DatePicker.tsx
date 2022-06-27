import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  Stack,
  IconButton,
  BoxProps,
  useStyleConfig,
  FormControl,
  FormLabel,
  Box,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import { useTranslation } from "next-i18next";
import { forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const datePickerStyles = {
  baseStyle: {
    bg: "white",
    "& .react-datepicker": {
      "&__header": {
        bg: "none",
        borderBottom: "none",
      },
      "&__month": {
        mt: 0,
      },
      "&__day-name": {
        color: "gray.400",
        fontWeight: "medium",
        w: 7,
      },
      "&__day": {
        lineHeight: "28px",
        color: "gray.700",
        w: 7,
        h: 7,
        borderRadius: "full",
      },
      "&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover":
        {
          bg: "white",
          boxShadow: "0 0 1px 1px rgba(0,0,0,0.2)",
        },
      "&__day--today": {
        bg: "gray.100",
        fontWeight: "400",
      },
      "&__day--selected, &__day--keyboard-selected": {
        bg: "gray.700",
        color: "white",
      },
    },
  },
};

const CustomInput = forwardRef<any, any>((props, ref) => {
  return (
    <InputGroup>
      <Input {...props} ref={ref} boxShadow="sm" />
      <InputRightElement userSelect="none" pointerEvents="none">
        <CalendarIcon />
      </InputRightElement>
    </InputGroup>
  );
});

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <Stack pb={1} isInline alignItems="center" textAlign="left" pl={4} pr={2}>
      <Text color="gray.700" flex={1} fontSize="sm" fontWeight="medium">
        {new Intl.DateTimeFormat("en-AU", {
          year: "numeric",
          month: "long",
        }).format(date)}
      </Text>
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Previous Month"
        icon={<ChevronLeftIcon />}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Next Month"
        icon={<ChevronRightIcon />}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Stack>
  );
};

export const DatePicker = ({
  name,
  label,
  ...props
}: BoxProps & { name: string; label?: string }) => {
  const styles = useStyleConfig("DatePicker");
  const [field, meta, { setValue, setTouched }] = useField(name);
  const { t } = useTranslation("errors");
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      {label && <FormLabel>{label}</FormLabel>}
      <Box __css={styles} {...props}>
        <ReactDatePicker
          selected={field.value}
          onChange={(date) => setValue(date)}
          onChangeRaw={() => setTouched(true)}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="yyyy-MM-dd HH:mm"
          customInput={<CustomInput />}
          renderCustomHeader={CustomHeader}
        />
      </Box>
      <FormErrorMessage>{meta.error && t(meta.error)}</FormErrorMessage>
    </FormControl>
  );
};
