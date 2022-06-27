import {
  BoxProps,
  Box,
  FormControl,
  FormErrorMessage,
  Image,
} from "@chakra-ui/react";
import { useField } from "formik";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { UseImage } from "./image";

export const SelectImage = ({
  name,
  ...props
}: BoxProps & { name: string }) => {
  const [field, meta, { setValue }] = useField(name);
  const { t: te } = useTranslation("error");
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  let initialBox = <Box bgColor={"gray"} {...props} />;
  if (typeof field.value === "string") {
    initialBox = <UseImage src={field.value} {...props} />;
  }
  return (
    <label>
      {imagePreview ? (
        <Image
          src={imagePreview}
          alt="Preview Image"
          objectFit="cover"
          {...props}
        />
      ) : (
        initialBox
      )}
      <input
        name={name}
        type="file"
        hidden
        accept="image/*"
        onChange={(e: any) => {
          const fileReader = new FileReader();
          const file = e.target.files[0] as File;
          setValue(file);
          fileReader.onload = () => {
            if (fileReader.readyState === 2) {
              setImagePreview(fileReader.result as string);
            }
          };
          fileReader.readAsDataURL(file);
        }}
      />
      <FormControl isInvalid={!!(meta.error && meta.touched)}>
        <FormErrorMessage>{meta.error && te(meta.error)}</FormErrorMessage>
      </FormControl>
    </label>
  );
};
