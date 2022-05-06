import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "layouts/basicLayout";
import { SiteLink } from "components/siteLink";
import getOrgDetail from "services/org/getOrgDetail";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import getOrgProjects from "services/project/getOrgProjects";
import { ProjectsPanelList } from "components/projectList";
import { Error } from "components/error";
import { Loading } from "components/loading";

const OrgDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data: orgInfo, isError: orgError } = useQuery(
    getOrgDetail({ orgId: id })
  );
  const { data: projects, isError: projectsError } = useQuery(
    getOrgProjects({ orgId: id })
  );

  const { t } = useTranslation("partners");

  if (orgError || projectsError) return <Error />;
  if (!projects || !orgInfo) return <Loading />;

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

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
            <Heading as="h2">{orgInfo.name}</Heading>
          </Box>
          <Spacer />
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Text>{orgInfo.description}</Text>
          <Heading>{orgInfo.slogan}</Heading>
        </Flex>
      </Box>
      <Box px={8} py={2}>
        <Tabs>
          <TabList>
            <Tab>{t("my_projects")}</Tab>
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
  await Promise.all([queryClient.prefetchQuery(getOrgDetail({ orgId: id }))]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common"])),
    },
  };
};
export default OrgDetailsPage;
