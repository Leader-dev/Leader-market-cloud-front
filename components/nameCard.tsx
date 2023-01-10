import {
  Box,
  BoxProps,
  Button,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillEdit, AiOutlineMail, AiOutlineMobile } from "react-icons/ai";
import { useQuery } from "react-query";
import getOrgManageList from "services/org/manage/getOrgManageList";
import { AgentProfile, NameCard } from "types/user";
import QRCode from "react-qr-code";
import accessStartUrl from "services/image/accessStartUrl";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { TextField } from "./TextField";
import { SelectOrg } from "./SelectOrg";

const NameCardSchema = Yup.object().shape({
  name: Yup.string().required("n.required"),
  position: Yup.string(),
  email: Yup.string().email("e.invalid"),
  phone: Yup.string().matches(/^[0-9]{11}$/, "p.invalid"),
});

const EditModal = ({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues: NameCard;
}) => {
  const { t } = useTranslation("account", { keyPrefix: "name_card" });
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("edit")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log("Submitting form with values:", values);
                setSubmitting(false);
                onClose();
              }, 500);
            }}
            validationSchema={NameCardSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField label={t("name")} name="name" labelMt={0} />
                <TextField label={t("position")} name="position" />
                <TextField label={t("email")} name="email" />
                <TextField label={t("phone")} name="phone" />
                <SelectOrg label={t("display_org")} name="orgId" />
                <ModalFooter mt={10}>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const NameCard = ({
  info,
  editable = false,
  ...props
}: { info: AgentProfile; editable?: boolean } & BoxProps) => {
  const { data: orgList } = useQuery(getOrgManageList({}));
  const { data: startUrl } = useQuery(accessStartUrl({}));
  const orgName = orgList?.find((org) => org.id === info.orgId)?.name;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: waiting for back-end API
  const tmpIV: NameCard = {
    name: info.name,
    position: "技术部 部长",
    email: info.email,
    phone: info.phone,
    displayOrgId: info.orgId,
  };

  return (
    <>
      <EditModal isOpen={isOpen} onClose={onClose} initialValues={tmpIV} />
      <Stack
        borderRadius={"lg"}
        align="stretch"
        color="white"
        background={`linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ), url(${startUrl + "v2_NyrFehJsGoIlsKuS7V1x4NXXiNyrOBvD"})`}
        bgSize="cover"
        px={10}
        py={8}
        fontWeight="semibold"
        textStyle="description"
        {...props}
      >
        <Flex>
          <Box>{orgName}</Box>
          <Spacer />
          {editable && (
            <IconButton
              isRound={true}
              bgColor="#aaa"
              aria-label="edit"
              icon={<Icon as={AiFillEdit} />}
              onClick={onOpen}
            />
          )}
        </Flex>
        <Box pb={10}>
          <QRCode size={80} value="https://google.com" />
        </Box>
        <SimpleGrid columns={2}>
          <Stack>
            <Box fontSize="3xl" fontWeight="bold">
              {info.name}
            </Box>
            <Box>技术部门 部长</Box>
          </Stack>
          <Stack justify="center">
            <Flex align="center">
              {info.phone && <Icon as={AiOutlineMobile} mr={1} />}
              {info.phone}
            </Flex>
            <Flex align="center">
              {info.email && <Icon as={AiOutlineMail} mr={1} />}
              {info.email}
            </Flex>
          </Stack>
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default NameCard;
