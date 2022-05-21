import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import {
  Box,
  Text,
  Avatar,
  Heading,
  Grid,
  GridItem,
  Image,
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
} from "@chakra-ui/react";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BasicLayout } from "src/layouts/basicLayout";
import { ProjectsList } from "src/components/projectList";

import getAgentDetail from "services/agent/getAgentDetail";
import getAgentProjects from "services/project/getAgentProjects";
import { Error } from "src/components/error";
import { Loading } from "src/components/loading";

const ProjectPanel = ProjectsList;

const PartnerDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data: agent, isError: agentError } = useQuery(
    getAgentDetail({ agentId: id })
  );
  const { data: projects, isError: projectsError } = useQuery(
    getAgentProjects({ agentId: id })
  );

  const { t } = useTranslation("partners");

  if (agentError || projectsError) return <Error />;
  if (!projects || !agent) return <Loading />;

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

  return (
    <BasicLayout pageTitle={`${agent.name}`}>
      <Box pb={12}>
        <Avatar
          position="absolute"
          mt="24px"
          ml={`${imageMarginLeft}px`}
          size="2xl"
          src={agent.avatarUrl}
          name={agent.name}
        />
        <Flex w="full" bgColor="white" py={6} px={4} pl={`${imageSize}px`}>
          <Box>
            <Heading>{agent.name}</Heading>
          </Box>
          <Spacer />
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Box pr={4}>
            <Box color="blue.700">
              {agent.displayOrgId ? `@${agent.orgInfo.name}` : t("no_org")}
            </Box>
            <Box w="sm">{agent.description}</Box>
          </Box>
        </Flex>
      </Box>
      <Box px={8} py={2}>
        <Tabs>
          <TabList>
            <Tab>{t("projects")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectPanel projects={projects} />
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

  // query partner with id
  await Promise.all([
    queryClient.prefetchQuery(getAgentDetail({ agentId: id })),
    queryClient.prefetchQuery(getAgentProjects({ agentId: id })),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "partners"])),
    },
  };
};

export default PartnerDetailsPage;
