import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Stack,
  useDisclosure,
  AlertDialogCloseButton,
  Container,
  Flex,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { BasicLayout } from "layouts/basicLayout";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from "react-query";
import publishProject from "services/project/manage/publishProject";
import { EditableProject } from "types/project";
import * as Yup from "yup";
import getOrgManageList from "services/org/manage/getOrgManageList";
import { DatePicker } from "components/DatePicker";
import { SelectImage } from "components/SelectImage";
import { SelectOrg } from "components/SelectOrg";
import { Switch } from "components/Switch";
import { TextField } from "components/TextField";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getOrgManageList({}));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, [
        "common",
        "create",
        "errors",
      ])),
    },
  };
};

const NewProjectSchema = Yup.object().shape({
  title: Yup.string().required("title.required"),
  coverUrl: Yup.mixed().required("cover.required"),
  content: Yup.string().required("content.required"),
  startDate: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("start.required"),
  endDate: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("end.required")
    .min(Yup.ref("startDate"), "end.min"),
});

type CreateProjectInfo = Omit<
  EditableProject,
  "coverUrl" | "startDate" | "endDate"
> & {
  coverUrl: File | null;
  startDate: Date;
  endDate: Date;
};

type SubmitProjectInfo = Omit<EditableProject, "coverUrl"> & {
  coverUrl: File | null;
};

const NewProjectPage: NextPage = () => {
  const { t } = useTranslation("create", { keyPrefix: "project" });
  const { isOpen, onOpen: onDelete, onClose } = useDisclosure();
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const { back, push } = useRouter();

  const initialValues: CreateProjectInfo = {
    coverUrl: null,
    title: "",
    status: "active",
    content: "",
    tags: ["线下", "线上"],
    startDate: new Date(),
    endDate: new Date(),
    orgId: null,
    imageUrls: [],
    draft: false,
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO optimistic update
    (values: SubmitProjectInfo) => {
      return publishProject(values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("/mc/project/list/all");
        queryClient.invalidateQueries("/mc/project/manage/list");
        back();
      },
    }
  );

  return (
    <BasicLayout>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
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
            <Button ref={cancelRef} onClick={onClose}>
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
          const startDate = values.startDate.getTime().toString();
          const endDate = values.endDate.getTime().toString();
          const modifieldValues: SubmitProjectInfo = {
            ...values,
            startDate: startDate,
            endDate: endDate,
          };
          // console.log("submit", modifieldValues);
          mutation.mutate(modifieldValues);
          if (mutation.isSuccess) {
            setSubmitting(false);
            push("/account");
          }
        }}
        validationSchema={NewProjectSchema}
      >
        {({ isSubmitting, setFieldValue, submitForm }) => (
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
              <Button
                variant="outline"
                colorScheme={"blue"}
                onClick={() => {
                  setFieldValue("draft", true);
                  submitForm();
                }}
              >
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

            <Container maxW="4xl" px={0} pb={10} bg="white">
              <SelectImage name="coverUrl" w="full" h="40vh" />
              <Stack px={6} spacing={4} pt={4}>
                <TextField
                  name="title"
                  variant="flushed"
                  placeholder={t("enter_project_title")}
                  size="lg"
                />
                <Switch
                  name="status"
                  label={t("choose_project_status")}
                  activeLabel={t("active")}
                  inactiveLabel={t("inactive")}
                />
                <SelectOrg label={t("select_org")} name="orgId" width="40%" />
                <Stack>{t("choose_project_tags")}</Stack>
                <Stack>
                  {t("choose_project_duration")}
                  <Flex align="flex-start">
                    <DatePicker
                      name="startDate"
                      label={t("start_date")}
                      mr={2}
                    />
                    <DatePicker name="endDate" label={t("end_date")} />
                  </Flex>
                </Stack>
                <TextField
                  name="content"
                  variant="flushed"
                  placeholder={t("enter_project_content")}
                  label={t("project_content")}
                  multiLine={true}
                />
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>
    </BasicLayout>
  );
};

export default NewProjectPage;
