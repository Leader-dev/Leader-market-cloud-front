import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { Box, Avatar, Heading, Text, Container, Image } from "@chakra-ui/react";

import { ProjectDetail } from "types/project";
import { BasicLayout } from "layouts/basicLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps<{
  projectDetail: ProjectDetail;
}> = async (ctx) => {
  const { id } = ctx.query;

  // query projectDetail with id
  const projectDetail: ProjectDetail = {
    id,
    title: "Example Project",
    description:
      "This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, This is an example project, ",
    owner: {
      id: 114514,
      username: "Example Owner",
    },
    banner: "https://picsum.photos/id/1/400/300",
  };

  return {
    props: {
      projectDetail,
      ...(await serverSideTranslations(ctx.locale!, ['common']))
    },
  };
};



const ProjectDetailPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projectDetail: { id, title, description, banner, owner } }) => {
  return (
    <BasicLayout pageTitle={`${title}`}>
      <Box w="full" bg="gray.100">
        <Container maxW="2xl" minH="100vh" p={0} bg="white">
          <Image src={banner} w="full" alt="Project Banner" />
          {/* Title */}
          <Box px={4}>
            <Box my={4}>
              <Heading as="h1" size="xl">
                {title}
              </Heading>
            </Box>
            {/* Metadata */}
            <Box w="full">
              <Box d="flex" alignItems="center" justifyContent="space-between">
                <Box d="flex" alignItems="center">
                  <Avatar src={owner.avatar} />
                  <Box ml={2}>
                    <Heading as="h2" size="sm">
                      {owner.username}
                    </Heading>
                    {/* <Text>{description}</Text> */}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>{description}</Box>
          </Box>
        </Container>
      </Box>
    </BasicLayout>
  );
};

export default ProjectDetailPage;
