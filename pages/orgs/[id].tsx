import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "src/layouts/basicLayout";
import { SiteLink } from "src/components/siteLink";
import getOrgDetail from "services/org/getOrgDetail";
import {
  Avatar,
  Box,
  Flex,
  Circle,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Center,
  Tag,
  VStack,
} from "@chakra-ui/react";
import getOrgProjects from "services/project/getOrgProjects";
import { ProjectsPanelList } from "src/components/projectList";
import { Error } from "src/components/error";
import { Loading } from "src/components/loading";
import { OrgAvatar, UserAvatar } from "src/components/image";

const OrgDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data: orgInfo, isError: orgError } = useQuery(
    ["orgDetail", id],
    getOrgDetail({ orgId: id })
  );
  const { data: projects, isError: projectsError } = useQuery(
    ["orgProjects", id],
    getOrgProjects({ orgId: id })
  );

  const { t } = useTranslation("organizations");

  if (orgError || projectsError) return <Error />;
  if (!projects || !orgInfo) return <Loading />;

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

  return (
    <BasicLayout pageTitle={`${orgInfo.name}`} backgroundColor="white">
      <Box pb={12}>
        <VStack position="absolute" mt="24px" ml={`${imageMarginLeft}px`}>
          <OrgAvatar
            size="2xl"
            src={orgInfo.avatarUrl}
            name={orgInfo.name}
            showBorder={true}
            borderWidth="3px"
            certification={orgInfo.certification}
          />
        </VStack>

        <Flex w="full" pt={8} px={4} pl={`${imageSize}px`}>
          <Box textStyle={"title"}>{orgInfo.name}</Box>
          <Spacer />
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Text>{orgInfo.description}</Text>
        </Flex>
        <Box ml={10} py={4} textStyle={"slogan"}>
          {orgInfo.slogan}
        </Box>
      </Box>
      <Box px={8} py={2}>
        <Tabs size={"lg"}>
          <TabList>
            <Tab px={6}>{t("projects")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectsPanelList projects={projects} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  const id = ctx.query.id as string;

  // query organization with id
  await Promise.all([
    queryClient.prefetchQuery(["orgDetail", id], getOrgDetail({ orgId: id })),
  ]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, [
        "common",
        "organizations",
      ])),
    },
  };
};
export default OrgDetailsPage;
