import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
  AlertDialogCloseButton,
  Box,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { BasicLayout } from "layouts/basicLayout";
import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useRef } from "react";
import * as Yup from "yup";
import { EditableOrg } from "types/user";
import createOrg from "services/org/manage/createOrg";
import { TextField } from "components/TextField";
import { SelectImage } from "components/SelectImage";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, [
        "common",
        "create",
        "errors",
      ])),
    },
  };
};

const NewOrgSchema = Yup.object().shape({
  name: Yup.string().required("n.required"),
  avatarUrl: Yup.mixed().required("a.required"),
  description: Yup.string().required("d.required"),
  slogan: Yup.string().required("s.required").max(25),
});

const NewOrgPage: NextPage = () => {
  const { t } = useTranslation("create");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
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
              <SelectImage
                name="avatarUrl"
                w="200px"
                h="200px"
                borderRadius="50%"
              />
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
                multiLine={true}
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
