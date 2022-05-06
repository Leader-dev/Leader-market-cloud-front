import { GetServerSideProps, NextPage } from "next";
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
  SimpleGrid,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Editable,
  EditablePreview,
  // @ts-ignore
  EditableTextarea,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AiOutlineSwap } from "react-icons/ai";
import { useState } from "react";

import { BasicLayout } from "layouts/basicLayout";
import { ProjectsPanelList } from "components/projectList";

import getOrgManageList from "services/org/manage/getOrgManageList";
import getAgentInfo from "services/agent/manage/getAgentInfo";
import getOrgDetail from "services/org/getOrgDetail";
import getOrgProjects from "services/project/getOrgProjects";
import getOrgManageRoles from "services/org/manage/getOrgManageRoles";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Loading } from "../../components/loading";

const Members: React.FC = () => {
  return <></>;
};

const SettingCard: React.FC<{
  title: string;
  content: string;
  buttonTitle: string;
  onClick: () => {};
}> = ({ title, content, buttonTitle, onClick }) => {
  return (
    <Box borderRadius={20} p={10}>
      <Heading as="h2">{title}</Heading>
      <Box textStyle={"p"}>{content}</Box>
      <Button>{buttonTitle}</Button>
    </Box>
  );
};

const Settings: React.FC = () => {
  return <SimpleGrid columns={3} spacing={10}></SimpleGrid>;
};

const OrgManagePageProtector: NextPage = () => {
  const { query } = useRouter();
  const orgId = query.orgId as string;
  const { data: role, isError } = useQuery(getOrgManageRoles({ orgId: orgId }));

  if (!role) return <Loading />;

  if (!role.isAdmin) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Authorization Failed</AlertTitle>
        <AlertDescription>
          You do not have the permission to access this page
        </AlertDescription>
      </Alert>
    );
  }

  return <OrgManagePage />;
};

const OrgManagePage: React.FC = () => {
  const { query } = useRouter();
  const orgId = query.orgId as string;
  const orgInfo = useQuery(getOrgDetail({ orgId: orgId })).data!;
  const projects = useQuery(getOrgProjects({ orgId: orgId })).data!;
  const myOrgs = useQuery(getOrgManageList({})).data!;

  const { t } = useTranslation("orgs");

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

  const [slogan, setSlogan] = useState(orgInfo.slogan);
  const [description, setDescription] = useState(orgInfo.description);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="flex-end" size="sm">
        <IconButton
          aria-label="Submit"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Cancel"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="flex-end">
        <IconButton
          aria-label="Edit"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <BasicLayout pageTitle={`${orgInfo.name}`} backgroundColor="gray.100">
      <Box pb={12}>
        <Avatar
          position="absolute"
          mt="24px"
          ml={`${imageMarginLeft}px`}
          size="2xl"
          src={orgInfo.avatarUrl}
          name={orgInfo.name}
        />
        <Flex w="full" bgColor="white" py={3} px={4} pl={`${imageSize}px`}>
          <Box>
            <Heading>{orgInfo.name}</Heading>
          </Box>
          <Spacer />
          <>
            <Box>
              {myOrgs.map((org) => (
                <Avatar key={org.id} name={org.name} src={org.avatarUrl} />
              ))}
            </Box>
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
          </>
        </Flex>
        <SimpleGrid
          w="full"
          py={3}
          pl={`${imageSize}px`}
          columns={2}
          spacing={10}
        >
          <VStack>
            <Text fontSize="xl">{t("org_description")}</Text>
            <Editable
              defaultValue={orgInfo.description}
              // fontSize='2xl'
              isPreviewFocusable={false}
              onSubmit={(v) => {
                console.log(v);
              }}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableTextarea} />
              <EditableControls />
            </Editable>
          </VStack>
          <VStack>
            <Text fontSize="xl">{t("org_slogan")}</Text>
            <Editable
              defaultValue={orgInfo.slogan}
              // fontSize='2xl'
              isPreviewFocusable={false}
              onSubmit={(v) => {
                console.log(v);
              }}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Input as={EditableTextarea} maxLength={25} />
              <EditableControls />
            </Editable>
          </VStack>
        </SimpleGrid>
      </Box>
      <Box px={8} py={2}>
        <Tabs>
          <TabList>
            <Tab>{t("my_projects")}</Tab>
            <Tab>{t("members")}</Tab>
            <Tab>{t("settings")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectsPanelList projects={projects} />
            </TabPanel>
            <TabPanel>
              <Members />
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
  await Promise.all([queryClient.prefetchQuery(getAgentInfo({}))]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "account"])),
    },
  };
};

export default OrgManagePageProtector;
