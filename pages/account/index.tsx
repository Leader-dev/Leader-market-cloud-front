import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import {
  Box,
  Text,
  Avatar,
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
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Switch,
  Icon,
  ButtonGroup,
  useEditableControls,
  IconButton,
  Editable,
  EditablePreview,
  EditableInput,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  AiOutlineSwap,
  AiOutlineMobile,
  AiOutlineMail,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";
import React, { useState } from "react";

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
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { OrgAvatar, UserAvatar } from "components/image";

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

const InputField = ({
  defaultValue,
  leftElement,
}: {
  defaultValue: string;
  leftElement?: React.ReactNode;
}) => {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          aria-label="check"
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label="close"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="sm"
          aria-label="edit"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      defaultValue={defaultValue}
      textAlign="left"
      // fontSize='md'
      isPreviewFocusable={false}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          {leftElement}
          <EditablePreview />
        </Flex>
        <Input variant="flushed" as={EditableInput} />
        <EditableControls />
      </Flex>
    </Editable>
  );
};

const Settings = () => {
  const partner = useQuery(getAgentInfo({})).data!;
  const { t } = useTranslation("account");

  return (
    <Flex>
      <Box bg={"white"} borderRadius={"20px"} w={"60%"} mr={10} p={10}>
        <Heading as={"h3"}>账号设置</Heading>
      </Box>
      <Box bg={"white"} borderRadius={"20px"} p={10} w={"40%"}>
        <Heading as={"h3"}>对外信息</Heading>
        <Box mt={2} mb={4}>
          {t("show_contacts_hint")}
        </Box>
        <Flex align="center" mb={4}>
          {t("show_contacts")}
          <Switch isChecked={true} mx={2} />
          {t("hide_contacts")}
        </Flex>
        <Stack spacing={2} textAlign="right">
          <InputField
            defaultValue={partner.phone}
            leftElement={
              <Icon as={AiOutlineMobile} color="blue.500" mr={2} w={5} h={5} />
            }
          />
          <InputField
            defaultValue={partner.email}
            leftElement={
              <Icon as={AiOutlineMail} color="blue.500" mr={2.5} w={5} h={5} />
            }
          />
        </Stack>
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
  if (partner.displayOrgId) {
    displayOrgName = orgList.find(
      (org) => org.id === partner.displayOrgId
    )?.name;
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
          pt={8}
          pb={4}
          px={4}
          pl={`${imageSize}px`}
          align="center"
        >
          <Box>
            <Heading>{partner.name}</Heading>
          </Box>
          <Spacer />
          <Flex>
            <HStack spacing={4} mr={2}>
              {orgList.map((org) => (
                <OrgAvatar
                  certification={org.certification}
                  showTag={false}
                  key={org.id}
                  name={org.name}
                  src={org.avatarUrl}
                  onClick={() => {
                    push(`/account/org/${org.id}`);
                  }}
                  variant={"with-shadow"}
                />
              ))}
            </HStack>
            <Button
              variant="outline"
              colorScheme="blue"
              size="lg"
              ml={3}
              leftIcon={<AiOutlineSwap />}
              onClick={() => {}}
            >
              {t("my_org")}
            </Button>
          </Flex>
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Box pr={4}>
            <Box color="blue.700">
              {partner.displayOrgId ? `@${displayOrgName}` : t("no_org")}
            </Box>
            <Box w="sm">{partner.description}</Box>
          </Box>
          <Spacer />
          <Box>
            <Stack spacing={4}>
              <Box textAlign="right">
                <Button
                  leftIcon={<AiOutlinePlus />}
                  variant="solid"
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    push("/create/project");
                  }}
                >
                  {t("new_project")}
                </Button>
                <Button
                  leftIcon={<AiOutlinePlus />}
                  variant="outline"
                  colorScheme="blue"
                  borderStyle="dashed"
                  mr={3}
                  onClick={() => {
                    push("/create/org");
                  }}
                >
                  {t("new_org")}
                </Button>
              </Box>
            </Stack>
          </Box>
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
      ...(await serverSideTranslations(ctx.locale!, ["common", "account"])),
    },
  };
};

export default AccountManagePage;
