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

import { ProjectDetail } from "types/project";
import { BasicLayout } from "layouts/basicLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SiteLink } from "components/siteLink";
import { Tags } from "components/tags";
import {Label} from "components/label";

export const getServerSideProps: GetServerSideProps<{
  projectDetail: ProjectDetail;
}> = async (ctx) => {
  const { id } = ctx.query;

  // query projectDetail with id
  const projectDetail: ProjectDetail = {
    id,
    title: "【为危机博弈】系列商赛——第七届",
    description:
      "This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project,\nTHISISISO:IJL:KJA:WJID:OWJIFLKJHHGUHFIJHWGFUHJNDWBHFDUJWDNBFHUIJDB SKFALHBFHJKWBHF ASFH OSAFKJHO#IO VOIU WOFI \n\n IOUYW COHSAUPUH WPIUC PIUHS  ",
    owner: {
      id: 114514,
      username: "Example Owner",
    },
    coverUrl: "https://picsum.photos/id/1/400/300",
    tags: ["tag1", "tag2", "tag3"],
    org: {
      id: 114514,
      name: "Example Org",
      bio: "This is an example org",
      avatar: "https://picsum.photos/id/1/400/300",
    },
    status: "有效",
  };

  return {
    props: {
      projectDetail,
      ...(await serverSideTranslations(ctx.locale!, ["common"])),
    },
  };
};

const ProjectDetailPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
  projectDetail: { id, title, description, coverUrl, owner, status, org, tags },
}) => {
  const { t } = useTranslation("projects");
  return (
    <BasicLayout pageTitle={`${title}`}>
      <Box w="full" bg="gray.100">
        <Container maxW="4xl" minH="100vh" p={0} bg="white">
          <Image src={coverUrl} w="full" alt="Project Banner" />
          {/* Title */}
          <Box px={6} py={6}>
            <Flex mb={4}>
              <Heading as="h1" size="lg">
                {title}
              </Heading>
              <Spacer />
              <Label>
                {status}
              </Label>
            </Flex>
            {/* Metadata */}
            <Box mb={4}>
              <SiteLink color="blue.600" href={`/partners/${id}`}>
                @{org.name}
              </SiteLink>
            </Box>
            <Box mb={4}>
              <Tags tags={tags} />
            </Box>
            <Box>
              <Box color="gray.600" mb={4}>
                {t("project_description")}
              </Box>
              <Box>
                {description.split("\n").map((l) => (
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
