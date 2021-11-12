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
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AiOutlineSwap } from "react-icons/ai";

import { BasicLayout } from "layouts/basicLayout";
import { Card } from "components/card";

import getPartnerDetail from "services/getPartnerDetail";
import getLoginStatus from "services/getLoginStatus";

const PartnerDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const partner = useQuery(getPartnerDetail({ id })).data!;

  const { t } = useTranslation("partners");

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

  if (!partner.isSelf) return null;

  return (
    <BasicLayout pageTitle={`${partner.username}`} backgroundColor="gray.100">
      <Box pb={12}>
        <Avatar
          position="absolute"
          mt="24px"
          ml={`${imageMarginLeft}px`}
          size="2xl"
          src={partner.avatar}
          name={partner.username}
        />
        <Flex w="full" bgColor="white" py={3} px={4} pl={`${imageSize}px`}>
          <Box>
            <Heading>{partner.username}</Heading>
          </Box>
          <Spacer />
          <Box>
            {partner.orgs.map((org) => {
              return <Avatar key={org.id} name={org.name} src={org.avatar} />;
            })}
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
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Box>
            <Box>Org</Box>
            <Box>Bio</Box>
          </Box>
          <Box>Contacts</Box>
          <Spacer />
          <Box>Actions</Box>
        </Flex>
      </Box>
      <Box px={8} py={2}>
        {partner.isSelf ? (
          <Tabs>
            <TabList>
              <Tab>{t("my_projects")}</Tab>
              <Tab>{t("collab_wanted")}</Tab>
              <Tab>{t("favorites")}</Tab>
              <Tab>{t("drafts")}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>1</TabPanel>
              <TabPanel>2</TabPanel>
              <TabPanel>3</TabPanel>
              <TabPanel>4</TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Tabs>
            <TabList>
              <Tab>{t("my_projects")}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>1</TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  const id = ctx.query.id as string;

  // query partner with id
  await Promise.all([queryClient.prefetchQuery(getPartnerDetail({ id }))]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common"])),
    },
  };
};

export default PartnerDetailsPage;
