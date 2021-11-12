import { Box, Input, SimpleGrid, Img, Avatar } from "@chakra-ui/react";
import NextImage from "next/image";
import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { BasicLayout } from "layouts/basicLayout";
import { SiteLink } from "components/siteLink";
import { SearchBar } from "components/searchBar";
import type { User } from "types/user";
import type { Project } from "types/project";

const ProjectsList = () => {
  const projects: Project[] = [
    {
      title: "【为危机博弈】第七届商赛",
      owner: {
        username: "林晓晓",
        id: "12345",
      },
      id: 1,
      banner: "https://picsum.photos/id/1/400/300",
    },
    {
      title: "【为危机博弈】第七届商赛",
      owner: {
        username: "林晓晓",
        id: "12345",
      },
      id: 2,
      banner: "https://picsum.photos/id/1/400/300",
    },
    {
      title: "【为危机博弈】第七届商赛",
      owner: {
        username: "林晓晓",
        id: "12345",
      },
      id: 3,
      banner: "https://picsum.photos/id/1/400/300",
    },
  ];
  return (
    <SimpleGrid
      columns={2}
      spacingX={28}
      spacingY={20}
      py={10}
      px={10}
      bg="gray.100"
    >
      {projects.map((project) => (
        <SiteLink
          href={`/projects/${project.id}`}
          key={project.id}
          borderWidth="1px"
          bg="white"
          shadow="md"
          overflow="hidden"
          transition="box-shadow 0.2s"
          _hover={{
            shadow: "lg",
          }}
        >
          <Box w="100%">
            {/* <NextImage src={project.banner} alt={project.title} /> */}
            <Img w="100%" src={project.banner} alt={project.title} />
          </Box>
          <Box w="100%" p={5}>
            <Box fontSize="md" mb={2}>
              {project.title}
            </Box>
            <Box>
              <Avatar
                size="sm"
                name={project.owner.username}
                src={project.owner.avatar}
                mr={2}
              />
              {project.owner.username}
            </Box>
          </Box>
        </SiteLink>
      ))}
    </SimpleGrid>
  );
};

const ProjectsPage: NextPage = () => {
  const { t } = useTranslation("projects");
  return (
    <BasicLayout pageTitle={t("pageTitle")}>
      <SearchBar />
      <ProjectsList />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "projects"])),
  },
});

export default ProjectsPage;
