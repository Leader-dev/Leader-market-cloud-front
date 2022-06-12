import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Image,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  useDisclosure,
  AlertDialogCloseButton,
  Box,
  InputProps,
  Textarea,
  Avatar,
  Circle,
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  FieldHookConfig,
  Form,
  Formik,
  useField,
} from "formik";
import { BasicLayout } from "layouts/basicLayout";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useRef } from "react";
import { dehydrate, QueryClient } from "react-query";
import * as Yup from "yup";
import { EditableOrg } from "types/user";
import createOrg from "services/org/manage/createOrg";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common", "create"])),
    },
  };
};

const TextField = ({
  label,
  multipleLine = false,
  ...props
}: { label?: string; multipleLine?: boolean } & FieldHookConfig<string> &
  InputProps) => {
  const [field, meta] = useField(props);
  // const { t } = useTranslation("create");
  const { t: te } = useTranslation("create", { keyPrefix: "errors" });
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      {label ?? <FormLabel>{label}</FormLabel>}
      <Field as={multipleLine ? Textarea : Input} {...field} {...props} />
      <FormErrorMessage>{meta.error && te(meta.error)}</FormErrorMessage>
    </FormControl>
  );
};

const NewOrgSchema = Yup.object().shape({
  name: Yup.string().required("name.required"),
  avatarUrl: Yup.mixed().required("avatar.required"),
  description: Yup.string().required("description.required"),
  slogan: Yup.string().required("slogan.required").max(25),
});

const NewOrgPage: NextPage = () => {
  const { t } = useTranslation("create");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { back } = useRouter();

  const initialValues: Omit<EditableOrg, "avatarUrl"> & {
    avatarUrl: File | null;
  } = {
    avatarUrl: null,
    name: "",
    slogan: "",
    description: "",
  };

  return (
    <BasicLayout>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("cancel_header")}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{t("cancel_confirm_description")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={() => {
                back();
              }}
            >
              {t("confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values");
          console.log("submit", values);
          createOrg(values)
            .then(() => {
              setSubmitting(false);
              back();
            })
            .catch(() => {
              setSubmitting(false);
              // TODO: handle error
            });
        }}
        validationSchema={NewOrgSchema}
      >
        {(props) => (
          <Form>
            <HStack
              w="100vw"
              justify="flex-end"
              bg="white"
              spacing={6}
              px={12}
              py={4}
            >
              <Button colorScheme={"red"} variant="outline" onClick={onOpen}>
                {t("cancel")}
              </Button>
              <Button
                variant={"solid"}
                type="submit"
                colorScheme={"blue"}
                isLoading={props.isSubmitting}
              >
                {t("publish")}
              </Button>
            </HStack>

            <Box px={40}>
              <label>
                {props.values.avatarUrl ? (
                  <Image
                    src={URL.createObjectURL(props.values.avatarUrl)}
                    alt={"none"}
                    w="200px"
                    h="200px"
                    layout="fill"
                    borderRadius="50%"
                    my={5}
                  />
                ) : (
                  <Circle w="200px" h="200px" bgColor={"gray"} my={5} />
                )}
                <input
                  name="avatarUrl"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e: any) => {
                    props.setFieldValue(
                      "avatarUrl",
                      e.currentTarget.files[0] as File
                    );
                  }}
                />
                <Box color={"red.500"}>
                  <ErrorMessage name={"avatarUrl"} />
                </Box>
              </label>

              <TextField
                name="name"
                variant="flushed"
                placeholder="enter org name"
                type="text"
              />
              <TextField
                name="description"
                variant="flushed"
                placeholder="enter org description"
                type="text"
                multipleLine={true}
              />
              <TextField
                name="slogan"
                variant="flushed"
                placeholder="enter org slogan"
                type="text"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </BasicLayout>
  );
};

export default NewOrgPage;
