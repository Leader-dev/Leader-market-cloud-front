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
  SimpleGrid,
  Editable,
  EditablePreview,
  // @ts-ignore
  useEditableControls,
  ButtonGroup,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AiOutlineSwap } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BasicLayout } from "layouts/basicLayout";
import { ProjectsPanelList } from "components/projectList";
import getOrgManageList from "services/org/manage/getOrgManageList";
import getOrgDetail from "services/org/getOrgDetail";
import getOrgProjects from "services/project/getOrgProjects";
import getOrgManageRoles from "services/org/manage/getOrgManageRoles";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Loading } from "components/loading";
import { Error } from "components/error";
import { OrgAvatar } from "components/image";
import OrgHStack from "components/orgHStack";
// import { UserAvatar } from "src/components/image";

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
  return <SimpleGrid columns={3} spacing={10} />;
};

const OrgManagePage: NextPage = () => {
  const { query } = useRouter();
  const orgId = query.orgId as string;
  const { data: orgInfo, isError: orgError } = useQuery(
    ["orgDetail", orgId],
    getOrgDetail({ orgId: orgId })
  );
  const { data: projects, isError: proError } = useQuery(
    ["orgProjects", orgId],
    getOrgProjects({ orgId: orgId })
  );
  const { data: orgList, isError: manageError } = useQuery(
    "orgManageList",
    getOrgManageList({})
  );
  const { data: role, isError: roleError } = useQuery(
    ["orgManageRoles", orgId],
    getOrgManageRoles({ orgId: orgId })
  );
  const { t } = useTranslation("account", { keyPrefix: "orgManage" });

  const [slogan, setSlogan] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { push } = useRouter();

  useEffect(() => {
    if (orgInfo) {
      setSlogan(orgInfo.slogan);
      setDescription(orgInfo.description);
    }
  }, [orgInfo]);

  if (orgError || proError || manageError || roleError) return <Error />;
  if (!orgInfo || !projects || !orgList || !role) return <Loading />;

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

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
    <BasicLayout pageTitle={`${orgInfo.name}`}>
      <Box pb={12}>
        <Box position="absolute" mt="24px" ml={`${imageMarginLeft}px`}>
          <OrgAvatar
            src={orgInfo.avatarUrl}
            name={orgInfo.name}
            size="2xl"
            certification={orgInfo.certification}
          />
        </Box>

        <Flex
          w="full"
          bgColor="white"
          py={3}
          px={4}
          pl={`${imageSize}px`}
          align="center"
        >
          <Box>
            <Heading>{orgInfo.name}</Heading>
          </Box>
          <Spacer />
          <>
            <OrgHStack orgList={orgList} />
            <Button
              variant="outline"
              colorScheme="blue"
              size="lg"
              ml={3}
              leftIcon={<AiOutlineSwap />}
              onClick={() => push("/account")}
            >
              {t("switch_to_person")}
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
          <Stack>
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
              {/*TODO this is not working*/}
              {/*<Input as={EditableTextarea} />*/}
              <EditableControls />
            </Editable>
          </Stack>
          <Stack>
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
              {/*TODO this is not working*/}
              {/*<Input as={EditableTextarea} maxLength={25} />*/}
              <EditableControls />
            </Editable>
          </Stack>
        </SimpleGrid>
      </Box>
      <Box px={8} py={2}>
        <Tabs size={"lg"}>
          <TabList>
            <Tab px={6}>{t("projects")}</Tab>
            <Tab px={6}>{t("members")}</Tab>
            {role.isAdmin ? <Tab>{t("settings")}</Tab> : null}
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
  const orgId = ctx.query.orgId as string;
  await Promise.all([
    queryClient.prefetchQuery(
      ["orgDetail", orgId],
      getOrgDetail({ orgId: orgId })
    ),
  ]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "account"])),
    },
  };
};

export default OrgManagePage;
