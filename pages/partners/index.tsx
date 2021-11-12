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
  IconButton,
  Button,
  Icon,
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

import getIndividualPartners from "services/getIndividualPartners";
import getOrganizationPartners from "services/getOrganizationPartners";

const IndividualPartners = () => {
  const { t } = useTranslation("partners");
  const { push } = useRouter();
  const { data: partners } = useQuery(getIndividualPartners({}));
  return (
    <Grid bg="gray.100" templateColumns="repeat(3, 1fr)" gap={10} p={8}>
      {partners?.map((partner) => (
        <GridItem key={partner.id} pt={12}>
          <Card
            overflow="visible"
            overflowX="visible"
            variant="interactive"
            // @ts-ignore
            href={`/partner/${partner.id}`}
            onClick={() => push(`/partners/${partner.id}`)}
          >
            <Card.Content>
              <Flex
                mt={-8}
                align="center"
                position="relative"
                zIndex={1}
                pointerEvents="none"
              >
                <Avatar
                  size="xl"
                  name={partner.username}
                  src={partner.avatar}
                  pointerEvents="auto"
                />
                <Spacer />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`${partner.username} liked!`);
                  }}
                  variant="solid"
                  colorScheme="blue"
                  borderRadius="full"
                  size="sm"
                  mr={2}
                  pointerEvents="auto"
                >
                  {t("interested")}
                </Button>
                <IconButton
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`${partner.username} followed!`);
                  }}
                  aria-label="follow"
                  icon={<Icon w={6} h={6} as={AiOutlineStar} />}
                  pointerEvents="auto"
                />
              </Flex>
            </Card.Content>
            <Card.Title pb={0} mb={1}>
              {partner.username}
            </Card.Title>
            <Card.Subtitle pt={0} mt={0} mb={2} pb={1}>
              {partner.org && <Box>{partner.org.name}</Box>}
            </Card.Subtitle>
            <Card.Content pt={1}>
              {partner.bio && <Box color="gray.800">{partner.bio}</Box>}
              <Flex mt={2}>
                <Center w="calc(50% - 1px)">
                  <Box textAlign="center">
                    <Box fontSize="xl" fontWeight="bold">
                      {partner.popularity}
                    </Box>
                    <Box>合作人气</Box>
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
                      {partner.projectCount}
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

const OrganizationPartners = () => {
  const { t } = useTranslation("partners");
  const { push } = useRouter();
  const { data: orgs } = useQuery(getOrganizationPartners({}));
  return (
    <Grid bg="gray.100" templateColumns="repeat(3, 1fr)" gap={8} p={8}>
      {orgs?.map((org) => (
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
                <Avatar size="xl" name={org.name} src={org.avatar} />
              </Box>
            </Card.Content>
            <Card.Title textAlign="center">{org.name}</Card.Title>
            <Card.Content>
              <Box>{org.bio}</Box>
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
          <SearchBar boxProps={{ w: "600px", flexGrow: 1 }} />
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
  await queryClient.prefetchQuery(getIndividualPartners({}));

  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "partners"])),
    },
  };
};

export default PartnersPage;