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
  AspectRatio,
  Container,
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
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import publishProject from "services/project/manage/publishProject";
import { EditableProject } from "types/project";
import * as Yup from "yup";
import getOrgManageList from "services/org/manage/getOrgManageList";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getOrgManageList({}));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "create"])),
    },
  };
};

const TextField = ({
  label,
  as,
  ...props
}: { label?: string } & FieldHookConfig<string> & InputProps) => {
  const [field, meta] = useField(props);
  const { t: te } = useTranslation("create", { keyPrefix: "errors" });
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      {label ?? <FormLabel>{label}</FormLabel>}
      <Field as={as} {...field} {...props} />
      <FormErrorMessage>{meta.error && te(meta.error)}</FormErrorMessage>
    </FormControl>
  );
};

const NewProjectSchema = Yup.object().shape({
  title: Yup.string().required("title.required"),
  coverUrl: Yup.mixed().required("cover.required"),
  content: Yup.string().required("content.required"),
});

type CreateProjectInfo = Omit<EditableProject, "coverUrl"> & {
  coverUrl: File | null;
};

const NewProjectPage: NextPage = () => {
  const { t } = useTranslation("project");
  const { isOpen, onOpen: onDelete, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { back } = useRouter();
  const { data: orgManageList } = useQuery(getOrgManageList({}));

  const initialValues: CreateProjectInfo = {
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

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (values: CreateProjectInfo) => {
      return publishProject(values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("/mc/project/list/all");
        queryClient.invalidateQueries("/mc/project/manage/list");
        back();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

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
          values.draft = false;
          mutation.mutate(values);
          setSubmitting(false);
        }}
        validationSchema={NewProjectSchema}
      >
        {({ values, isSubmitting, setFieldValue }) => (
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
                isLoading={isSubmitting}
              >
                {t("publish")}
              </Button>
            </HStack>

            <Container maxW="4xl" p={0} bg="white">
              <label>
                {values.coverUrl ? (
                  <Image
                    src={URL.createObjectURL(values.coverUrl)}
                    w="100%"
                    maxH="40vh"
                    alt="none"
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
                    setFieldValue("coverUrl", e.currentTarget.files[0] as File);
                  }}
                />
                <Box color={"red.500"}>
                  <ErrorMessage name={"coverUrl"} />
                </Box>
              </label>

              <Box px={6}>
                <TextField
                  name="title"
                  variant="flushed"
                  placeholder="enter project title"
                  as={Input}
                  type="text"
                />
                <TextField
                  name="content"
                  variant="flushed"
                  placeholder="enter project content"
                  type="text"
                  label={t("content")}
                  as={Textarea}
                />
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
    </BasicLayout>
  );
};

export default NewProjectPage;
