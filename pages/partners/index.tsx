import {
  Box,
  Text,
  Grid,
  GridItem,
  Image,
  Avatar,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Spacer,
  Flex,
  Center,
} from "@chakra-ui/react";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AiOutlineStar } from "react-icons/ai";

import { BasicLayout } from "layouts/basicLayout";
import { SiteLink } from "components/siteLink";
import { SearchBar } from "components/searchBar";
import { Card } from "components/card";
import { Divider } from "components/divider";
import { PartnerList } from "components/partnerList";

import getAgentList from "services/agent/getAgentList";
import getOrgList from "services/org/getOrgList";
import { Error } from "components/error";
import { Loading } from "components/loading";

const IndividualPartners = () => {
  const { data: partners } = useQuery(getAgentList({}));
  return <PartnerList partners={partners!} />;
};

const OrganizationPartners = () => {
  const { t } = useTranslation("partners");
  const { push } = useRouter();
  const { data: orgList, isError } = useQuery(getOrgList({}));

  if (isError) return <Error />;
  if (!orgList) return <Loading />;

  return (
    <Grid bg="gray.100" templateColumns="repeat(3, 1fr)" gap={8} p={8}>
      {orgList.map((org) => (
        <GridItem key={org.id}>
          <Card
            variant="interactive"
            overflow="visible"
            // @ts-ignore
            href={`/orgs/${org.id}`}
            onClick={() => push(`/orgs/${org.id}`)}
          >
            <Card.Content>
              <Box mt={-8} align="center" position="relative" zIndex={1}>
                <Avatar size="xl" name={org.name} src={org.avatarUrl} />
              </Box>
            </Card.Content>
            <Card.Title textAlign="center">{org.name}</Card.Title>
            <Card.Content>
              <Box>{org.description}</Box>
              <Flex mt={2}>
                <Center w="calc(50% - 1px)">
                  <Box textAlign="center">
                    <Box fontSize="xl" fontWeight="bold">
                      {org.memberCount}
                    </Box>
                    <Box>成员</Box>
                  </Box>
                </Center>
                <Divider
                  vertical
                  h="64px"
                  color="gray.300"
                  alignSelf="center"
                />
                <Center w="calc(50% - 1px)">
                  <Box textAlign="center">
                    <Box fontSize="xl" fontWeight="bold">
                      {org.projectCount}
                    </Box>
                    <Box>项目</Box>
                  </Box>
                </Center>
              </Flex>
            </Card.Content>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

const PartnersPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { t } = useTranslation("partners");
  return (
    <BasicLayout pageTitle={t("pageTitle")}>
      <Tabs variant="unstyled">
        <TabList px={8}>
          <Tab
            color="gray.500"
            fontSize="lg"
            px={4}
            py={3}
            _selected={{ color: "black" }}
          >
            {t("individuals")}
          </Tab>
          <Tab
            color="gray.500"
            fontSize="lg"
            px={4}
            py={3}
            _selected={{ color: "black" }}
          >
            {t("organizations")}
          </Tab>
          <SearchBar
            boxProps={{ w: "600px", flexGrow: 1 }}
            inputGroupProps={{ h: "35px" }}
          />
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <IndividualPartners />
          </TabPanel>
          <TabPanel p={0}>
            <OrganizationPartners />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getAgentList({}));

  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "partners"])),
    },
  };
};

export default PartnersPage;
