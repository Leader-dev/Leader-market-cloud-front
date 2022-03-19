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
import {
  AiOutlineSwap,
  AiOutlineMobile,
  AiOutlineMail,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";
import { useState } from "react";

import { BasicLayout } from "layouts/basicLayout";
import { Card } from "components/card";
import { ProjectsList } from "components/projectList";
import { PartnerList } from "components/partnerList";

import getPartnerDetail from "services/getPartnerDetail";
import getLoginStatus from "services/getLoginStatus";
import getWantedCollaborators from "services/getWantedCollaborators";
import getFavoritedPartners from "services/getFavoritedPartners";
import getDrafts from "services/project/manage/getProjectDrafts";

const ProjectPanel = ProjectsList;

const CollabWanted: React.FC = () => {
  const { t } = useTranslation("partners");
  const { data, isLoading } = useQuery(getWantedCollaborators({}));

  if (isLoading || !data) return <Spinner size="xl" />;

  const { with_me, i_want } = data;

  return (
    <Box>
      <Box>
        <Trans
          t={t}
          i18nKey={"partners_want_to_collab_with_you"}
          count={with_me.length}
        >
          There are <b>{{ count: with_me.length }}</b> partners that want to
          collaborate with you
        </Trans>
      </Box>
      <Box>
        <PartnerList partners={with_me} />
      </Box>
      <Box>{t("partnersYouInterestedIn")}</Box>
      <Box>
        <PartnerList partners={i_want} />
      </Box>
    </Box>
  );
};

const Favorites: React.FC = () => {
  const { data, isLoading } = useQuery(getFavoritedPartners({}));

  if (isLoading || !data) return <Spinner size="xl" />;

  return <PartnerList partners={data} />;
};

const Drafts: React.FC = () => {
  const { data, isLoading } = useQuery(getDrafts({}));

  if (isLoading || !data) return <Spinner size="xl" />;

  return <ProjectsList projects={data} />;
};

const PartnerDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const partner = useQuery(getPartnerDetail({ id })).data!;

  const { t } = useTranslation("partners");

  const [mobile, setMobile] = useState("+86 114 5141 9198");
  const [email, setEmail] = useState("johnDoe@some_domain.com");

  const imageMarginLeft = 36;
  const imageWidth = 128;
  const imageMarginRight = 24;
  const imageSize = imageMarginLeft + imageWidth + imageMarginRight;

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
          {partner.isSelf && (
            <>
              <Box>
                {partner.orgs.map((org) => {
                  return (
                    <Avatar key={org.id} name={org.name} src={org.avatar} />
                  );
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
            </>
          )}
        </Flex>
        <Flex w="full" py={3} pl={`${imageSize}px`}>
          <Box pr={4}>
            <Box color="blue.700">
              {partner.org ? `@${partner.org.name}` : t("no_org")}
            </Box>
            <Box w="sm">{partner.bio}</Box>
          </Box>
          <Box>
            <Stack spacing={4} textAlign="right">
              <InputGroup>
                <InputLeftElement>
                  <Icon
                    as={AiOutlineMobile}
                    w="24px"
                    h="24px"
                    color="blue.500"
                  />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={AiOutlineMail} w="24px" h="24px" color="blue.500" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <Box>
                {t("show_contacts")}
                <Switch isChecked={true} mx={2} />
                {t("hide_contacts")}
              </Box>
            </Stack>
          </Box>
          <Spacer />
          <Box>
            <Stack spacing={4}>
              <Box textAlign="right">
                <Button
                  leftIcon={<AiOutlinePlus />}
                  variant="outline"
                  colorScheme="blue"
                  borderStyle="dashed"
                  mr={3}
                >
                  {t("new_org")}
                </Button>
                <Button
                  leftIcon={<AiOutlinePlus />}
                  variant="solid"
                  colorScheme="blue"
                  mr={3}
                >
                  {t("new_project")}
                </Button>
              </Box>
              <Box textAlign="right">
                <Button leftIcon={<AiOutlineSetting />} mr={3}>
                  {t("account_settings")}
                </Button>
              </Box>
            </Stack>
          </Box>
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
              <TabPanel>
                <ProjectPanel projects={partner.projects} />
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
            </TabPanels>
          </Tabs>
        ) : (
          <Tabs>
            <TabList>
              <Tab>{t("my_projects")}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProjectPanel projects={partner.projects} />
              </TabPanel>
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
      ...(await serverSideTranslations(ctx.locale!, ["common", "partners"])),
    },
  };
};

export default PartnerDetailsPage;
