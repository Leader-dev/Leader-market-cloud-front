import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {
  Box,
  Avatar,
  Heading,
  Text,
  Container,
  Image,
  Flex,
  Spacer,
  Icon,
  Button,
  IconButton,
} from "@chakra-ui/react";

import { BasicLayout } from "src/layouts/basicLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SiteLink } from "src/components/siteLink";
import { Tags } from "src/components/tags";
import { Label } from "src/components/label";
import getProjectDetail from "services/project/getProjectDetail";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { Error } from "src/components/error";
import { Loading } from "src/components/loading";
import {
  AiOutlineClockCircle,
  AiOutlineEye,
  AiOutlineStar,
} from "react-icons/ai";
import { Card } from "src/components/card";
import { UseImage } from "src/components/image";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  const id = ctx.query.id as string;

  // query organization with id
  await queryClient.prefetchQuery(getProjectDetail({ projectId: id }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "projects"])),
    },
  };
};

const ProjectDetailPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data: projectDetail, isError } = useQuery(
    getProjectDetail({ projectId: id })
  );
  const { t } = useTranslation("projects");
  const { push } = useRouter();

  if (isError) return <Error />;
  if (!projectDetail) return <Loading />;

  const { publisherAgentInfo } = projectDetail;

  const startDate = new Date(parseInt(projectDetail.startDate));
  const endDate = new Date(parseInt(projectDetail.endDate));

  return (
    <BasicLayout pageTitle={`${projectDetail.title}`}>
      <Box w="full" bg="gray.100">
        <Container maxW="4xl" minH="100vh" p={0} bg="white">
          <UseImage
            src={projectDetail.coverUrl}
            width="full"
            alt="Project Banner"
          />
          {/* Title */}
          <Box px={6} py={6} textStyle="p">
            <Flex mb={4}>
              <Heading as="h1" size="lg" color="black">
                {projectDetail.title}
              </Heading>
              <Spacer />
              <Label>{t(projectDetail.status)}</Label>
            </Flex>
            <Flex align={"center"} mb={4}>
              <Icon as={AiOutlineEye} mr={1} />
              {projectDetail.readCount}
            </Flex>
            <Box mb={1}>
              <Tags tags={projectDetail.tags} />
            </Box>
            <Flex align={"center"} mb={4}>
              <Icon mr={2} as={AiOutlineClockCircle} />
              {startDate.toISOString().slice(0, 19).replace("T", " ")} 至{" "}
              {endDate.toISOString().slice(0, 19).replace("T", " ")}
            </Flex>
            <Box>
              <Box textStyle={"pTitle"}>{t("published_from")}</Box>
              <Card
                overflow="visible"
                overflowX="visible"
                variant="interactive"
                onClick={() => push(`/partners/${publisherAgentInfo.id}`)}
                w={"50%"}
                mt={10}
                ml={-1}
                pl={5}
                pb={1}
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
                      name={publisherAgentInfo.name}
                      src={publisherAgentInfo.avatarUrl}
                      pointerEvents="auto"
                    />
                    <Spacer />
                    {publisherAgentInfo.interested ? (
                      publisherAgentInfo.showContact ? (
                        <Box pt={1} textAlign="right">
                          {publisherAgentInfo.phone && (
                            <Box>{publisherAgentInfo.phone}</Box>
                          )}
                          {publisherAgentInfo.email && (
                            <Box>{publisherAgentInfo.email}</Box>
                          )}
                        </Box>
                      ) : (
                        <Box pt={2}>{t("not_show_to_public")}</Box>
                      )
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`${publisherAgentInfo.name} liked!`);
                        }}
                        variant="solid"
                        colorScheme="blue"
                        borderRadius="full"
                        size="sm"
                        mr={2}
                        mb={-2}
                        pointerEvents="auto"
                      >
                        {t("interested")}
                      </Button>
                    )}

                    <IconButton
                      variant="ghost"
                      mb={-2}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`${publisherAgentInfo.name} followed!`);
                      }}
                      aria-label="follow"
                      icon={<Icon w={6} h={6} as={AiOutlineStar} />}
                      pointerEvents="auto"
                    />
                  </Flex>
                </Card.Content>
                <Card.Title pb={0} mb={1}>
                  {publisherAgentInfo.name}
                </Card.Title>
                <Card.Subtitle pt={0} mt={0} mb={2} pb={1}>
                  {publisherAgentInfo.orgInfo && (
                    <Box>
                      <SiteLink
                        color="blue.600"
                        href={`/orgs/${projectDetail.orgInfo.id}`}
                      >
                        @{projectDetail.orgInfo.name}
                      </SiteLink>
                    </Box>
                  )}
                </Card.Subtitle>
              </Card>
            </Box>
            <Box>
              <Box textStyle={"pTitle"} mb={2} mt={8}>
                {t("project_description")}
              </Box>
              <Box textStyle="description">
                {projectDetail.content.split("\n").map((l: any) => (
                  <Box my={2} key={l}>
                    {l}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </BasicLayout>
  );
};

export default ProjectDetailPage;
