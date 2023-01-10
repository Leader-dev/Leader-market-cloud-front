import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import {
  Box,
  Text,
  Heading,
  Flex,
  Spacer,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Switch,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ButtonProps,
  Stack,
  ModalFooter,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Center,
} from "@chakra-ui/react";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";

import { BasicLayout } from "layouts/basicLayout";
import { ProjectsList } from "components/projectList";
import { AgentList } from "components/partnerList";
import getDrafts from "services/project/manage/getProjectDrafts";
import getAgentFavoriteList from "services/agent/favorite/getAgentFavoriteList";
import getInterestedAgentList from "services/agent/interest/getInterestedAgentList";
import getOrgManageList from "services/org/manage/getOrgManageList";
import getAgentInfo from "services/agent/manage/getAgentInfo";
import getProjectList from "services/project/manage/getProjectList";
import { Loading } from "components/loading";
import { Error } from "components/error";
import { UserAvatar } from "components/image";
import OrgHStack from "components/orgHStack";
import updateAgentInfo from "services/agent/manage/updateAgentInfo";
import NameCard from "components/nameCard";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "components/TextField";
import logout from "services/user/logout";
import { SelectImage } from "components/SelectImage";
import { SelectOrg } from "components/SelectOrg";

const ProjectPanel = ProjectsList;

const CollabWanted = () => {
  const { t } = useTranslation("account");
  const { data, isLoading } = useQuery(getInterestedAgentList({}));

  if (isLoading || !data) return <Spinner size="xl" />;

  const { interests, beingInterested } = data;

  return (
    <Box>
      <Box>
        <Trans
          t={t}
          i18nKey={"partners_want_to_collab_with_you"}
          count={beingInterested.length}
        >
          There are <b>{{ count: beingInterested.length }}</b> partners that
          want to collaborate with you
        </Trans>
      </Box>
      <Box>
        <AgentList partners={beingInterested} />
      </Box>
      <Box>{t("partners_you_interested_in")}</Box>
      <Box>
        <AgentList partners={interests} />
      </Box>
    </Box>
  );
};

const Favorites = () => {
  const { data, isLoading } = useQuery(getAgentFavoriteList({}));

  if (isLoading || !data) return <Spinner size="xl" />;

  return <AgentList partners={data} />;
};

const Drafts = () => {
  const { data, isLoading } = useQuery(getDrafts({}));

  if (isLoading || !data) return <Spinner size="xl" />;

  return <ProjectsList projects={data!} />;
};

const ButtonLink: React.FC<{ onOpen: () => void } & ButtonProps> = ({
  onOpen,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onOpen}
      variant="link"
      colorScheme="blue"
      size="lg"
      _hover={{ textUnderlineOffset: "4px", textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("name.required"),
  description: Yup.string().required("description.required"),
});

const Settings = () => {
  const agent = useQuery(getAgentInfo({})).data!;
  const { t } = useTranslation("account");
  const useUpdateAgentInfo = updateAgentInfo();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenSecurity,
    onOpen: onOpenSecurity,
    onClose: onCloseSecurity,
  } = useDisclosure();
  const {
    isOpen: isOpenPolicy,
    onOpen: onOpenPolicy,
    onClose: onCLosePolicy,
  } = useDisclosure();
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;
  const useLogout = logout();

  return (
    <Flex>
      <Box bg={"white"} borderRadius={"20px"} w={"60%"} mr={10} p={10}>
        <Heading as={"h3"}>{t("account_settings")}</Heading>
        <Stack spacing={4} align="flex-start" mt={8}>
          <ButtonLink onOpen={onOpenProfile}>{t("profile")}</ButtonLink>
          <Modal
            isOpen={isOpenProfile || useUpdateAgentInfo.isLoading}
            onClose={onCloseProfile}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text>{t("profile")}</Text>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={agent}
                  validationSchema={ProfileValidationSchema}
                  onSubmit={(values) => {
                    useUpdateAgentInfo.mutate(values);
                    onCloseProfile();
                  }}
                >
                  {() => (
                    <Form>
                      <Center>
                        <SelectImage
                          name="avatarUrl"
                          w="100px"
                          h="100px"
                          borderRadius="50%"
                        />
                      </Center>
                      <TextField label={t("name")} name="name" />
                      <TextField label={t("description")} name="description" />
                      <SelectOrg label={t("display_org")} name="orgId" />
                      <ModalFooter mt={10} pr={0}>
                        <Button
                          variant="outline"
                          mr={3}
                          onClick={onCloseProfile}
                        >
                          Close
                        </Button>
                        <Button
                          type="submit"
                          colorScheme="blue"
                          isLoading={useUpdateAgentInfo.isLoading}
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
          <ButtonLink onOpen={onOpenSecurity}>{t("security")}</ButtonLink>
          <ButtonLink onOpen={onOpenPolicy}>{t("policy")}</ButtonLink>
          <ButtonLink onOpen={onOpenLogout}>{t("logout")}</ButtonLink>
          <AlertDialog
            isOpen={isOpenLogout}
            onClose={onCloseLogout}
            leastDestructiveRef={cancelRef}
            // isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>
                <Text>{t("logout")}</Text>
              </AlertDialogHeader>
              <AlertDialogBody>
                <Text>{t("logout_confirm")}</Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onCloseLogout}>{t("cancel")}</Button>
                <Button
                  onClick={() => {
                    useLogout.mutate();
                  }}
                  isLoading={useLogout.isLoading}
                  colorScheme="red"
                  ml={3}
                >
                  {t("confirm")}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Stack>
      </Box>
      <Box bg={"white"} borderRadius={"20px"} p={10} w={"40%"}>
        <Heading as={"h3"}>{t("my_name_card")}</Heading>
        <Flex mt={2} mb={4}>
          <Box textStyle="description">{t("name_card_description")}</Box>
          <Spacer />
          <Flex align="center" mb={4}>
            <Text color={agent.showContact ? "gray.400" : "black"}>
              {t("hide_contacts")}
            </Text>

            <Switch
              // TODO which api???
              isDisabled={true}
              id="name_card"
              defaultChecked={agent.showContact}
              mx={2}
              sx={{ "--switch-track-width": "3rem" }}
              onChange={(e) =>
                useUpdateAgentInfo.mutate({
                  ...agent,
                  showContact: e.target.checked,
                })
              }
            />
            <Text color={agent.showContact ? "black" : "gray.400"}>
              {t("show_contacts")}
            </Text>
          </Flex>
        </Flex>
        <NameCard info={agent} editable={true} />
      </Box>
    </Flex>
  );
};

const AccountManagePage: NextPage = () => {
  const { data: partner, isError: partnerError } = useQuery(getAgentInfo({}));
  const { data: projects, isError: projectsError } = useQuery(
    getProjectList({})
  );
  const { data: orgList, isError: orgListError } = useQuery(
    getOrgManageList({})
  );
  const { t } = useTranslation("account");
  const { push } = useRouter();

  if (partnerError || projectsError || orgListError) return <Error />;
  if (!partner || !projects || !orgList) return <Loading />;

  let displayOrgName = undefined;
  if (partner.orgId) {
    displayOrgName = orgList.find((org) => org.id === partner.orgId)?.name;
  }

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

  return (
    <BasicLayout pageTitle={`${partner.name}`}>
      <Box pb={12}>
        <UserAvatar
          position="absolute"
          mt="24px"
          ml={`${imageMarginLeft}px`}
          size="2xl"
          src={partner.avatarUrl}
          name={partner.name}
        />
        <Flex
          w="full"
          bgColor="white"
          pt={4}
          pb={4}
          px={4}
          pl={`${imageSize}px`}
          align="center"
        >
          <Box>
            <Heading>{partner.name}</Heading>
          </Box>
          <Spacer />
          <>
            <OrgHStack orgList={orgList} />
            <Button
              variant="outline"
              colorScheme="blue"
              size="lg"
              ml={3}
              leftIcon={<AiOutlinePlus />}
              onClick={() => push("create/org")}
            >
              {t("new_org")}
            </Button>
          </>
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Box pr={4}>
            <Box color="blue.700">
              {partner.orgId ? `@${displayOrgName}` : t("no_org")}
            </Box>
            <Box w="sm">{partner.description}</Box>
          </Box>
          <Spacer />
        </Flex>
      </Box>
      <Box px={4} py={2}>
        <Tabs size={"lg"}>
          <TabList ml={8}>
            <Tab px={6}>{t("my_projects")}</Tab>
            <Tab px={6}>{t("collab_wanted")}</Tab>
            <Tab px={6}>{t("favorites")}</Tab>
            <Tab px={6}>{t("drafts")}</Tab>
            <Tab px={6}>{t("settings")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectPanel projects={projects} displayAdd={true} />
            </TabPanel>
            <TabPanel>
              <CollabWanted />
            </TabPanel>
            <TabPanel>
              <Favorites />
            </TabPanel>
            <TabPanel>
              <Drafts />
            </TabPanel>
            <TabPanel>
              <Settings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();

  // query partner with id
  await Promise.all([
    queryClient.prefetchQuery(getAgentInfo({})),
    queryClient.prefetchQuery(getProjectList({})),
    queryClient.prefetchQuery(getOrgManageList({})),
    queryClient.prefetchQuery(getDrafts({})),
    queryClient.prefetchQuery(getInterestedAgentList({})),
    queryClient.prefetchQuery(getAgentFavoriteList({})),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, [
        "common",
        "account",
        "errors",
      ])),
    },
  };
};

export default AccountManagePage;
