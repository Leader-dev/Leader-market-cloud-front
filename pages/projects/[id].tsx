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
} from "@chakra-ui/react";

import { BasicLayout } from "layouts/basicLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SiteLink } from "components/siteLink";
import { Tags } from "components/tags";
import { Label } from "components/label";
import getProjectDetail from "services/project/getProjectDetail";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { Error } from "components/error";
import { Loading } from "components/loading";

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  const id = ctx.query.id as string;

  // query organization with id
  await Promise.all([
    queryClient.prefetchQuery(getProjectDetail({ projectId: id })),
  ]);
  return {
    props: {
      prefetchedState: dehydrate(queryClient),
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

  if (isError) return <Error />;
  if (!projectDetail) return <Loading />;

  return (
    <BasicLayout pageTitle={`${projectDetail.title}`}>
      <Box w="full" bg="gray.100">
        <Container maxW="4xl" minH="100vh" p={0} bg="white">
          <Image src={projectDetail.coverUrl} w="full" alt="Project Banner" />
          {/* Title */}
          <Box px={6} py={6}>
            <Flex mb={4}>
              <Heading as="h1" size="lg">
                {projectDetail.title}
              </Heading>
              <Spacer />
              <Label>{projectDetail.status}</Label>
            </Flex>
            {/* Metadata */}
            <Box mb={4}>
              <SiteLink color="blue.600" href={`/partners/${id}`}>
                @{projectDetail.orgInfo.name}
              </SiteLink>
            </Box>
            <Box mb={4}>
              <Tags tags={projectDetail.tags} />
            </Box>
            <Box>
              <Box color="gray.600" mb={4}>
                {t("project_description")}
              </Box>
              <Box>
                {projectDetail.content.split("\n").map((l: any) => (
                  <Box as="p" my={2} key={l}>
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
