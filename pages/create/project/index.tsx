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
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  FieldHookConfig,
  FieldProps,
  Form,
  Formik,
  FormikProps,
  useField,
} from "formik";
import { BasicLayout } from "layouts/basicLayout";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import publishProject from "services/project/manage/publishProject";
import { EditableProject } from "types/project";
import * as Yup from "yup";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();

  return {
    props: {
      prefetchedState: dehydrate(queryClient),
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

const NewProjectSchema = Yup.object().shape({
  title: Yup.string().required("title.required"),
  coverUrl: Yup.mixed().required("cover.required"),
  content: Yup.string().required("content.required"),
});

const NewProjectPage: NextPage = () => {
  const { t } = useTranslation("project");
  const { isOpen, onOpen: onDelete, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { back } = useRouter();
  const [cover, setCover] = useState<File>();

  const initialValues: Omit<EditableProject, "coverUrl"> & {
    coverUrl: File | null;
  } = {
    coverUrl: null,
    title: "",
    status: "active",
    content: "",
    tags: ["线下"],
    startDate: "1609459200",
    endDate: "1609459200",
    orgId: "",
    imageUrls: [],
    draft: true,
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
            {t("delete_project_header")}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{t("delete_project_confirm")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef}
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
            <Button colorScheme="red" onClick={() => back()} ml={3}>
              {t("delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submit", values);
          values.status = "active";
          publishProject(values)
            .then(() => {
              setSubmitting(false);
              back();
            })
            .catch(() => {
              setSubmitting(false);
              // TODO: handle error
            });
        }}
        validationSchema={NewProjectSchema}
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
              <Button colorScheme={"red"} variant="outline" onClick={onDelete}>
                {t("delete")}
              </Button>
              <Button variant="outline" colorScheme={"blue"}>
                {t("save_as_draft")}
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
                {props.values.coverUrl ? (
                  <Image
                    src={URL.createObjectURL(props.values.coverUrl)}
                    w="100%"
                    maxH="40vh"
                    // objectFit={"cover"}
                    layout="fill"
                  />
                ) : (
                  <Box w="100%" h="40vh" bgColor={"gray"} />
                )}
                <input
                  name="coverUrl"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e: any) => {
                    props.setFieldValue(
                      "coverUrl",
                      e.currentTarget.files[0] as File
                    );
                  }}
                />
                <Box color={"red.500"}>
                  <ErrorMessage name={"coverUrl"} />
                </Box>
              </label>

              <TextField
                name="title"
                variant="flushed"
                placeholder="enter project title"
                type="text"
              />
              <TextField
                name="content"
                variant="flushed"
                placeholder="enter project content"
                type="text"
                label={t("content")}
                multipleLine={true}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </BasicLayout>
  );
};

export default NewProjectPage;
