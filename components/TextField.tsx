import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  TextareaProps,
  InputProps,
} from "@chakra-ui/react";
import { useField, Field } from "formik";
import { useTranslation } from "next-i18next";

import ResizeTextarea from "react-textarea-autosize";
import React from "react";

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={3}
      as={ResizeTextarea}
      {...props}
    />
  );
});

export const TextField = ({
  label,
  name,
  multiLine = false,
  labelMt = 4,
  ...props
}: {
  label?: string;
  name: string;
  labelMt?: number;
  multiLine?: boolean;
} & InputProps) => {
  const [field, meta] = useField(name);
  const { t: te } = useTranslation("errors");
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      {label && <FormLabel mt={labelMt}> {label} </FormLabel>}
      <Field
        as={multiLine ? AutoResizeTextarea : Input}
        {...field}
        {...props}
      />
      <FormErrorMessage>{meta.error && te(meta.error)}</FormErrorMessage>
    </FormControl>
  );
};
