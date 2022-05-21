import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { BasicLayout } from "src/layouts/basicLayout";
import { SearchBar } from "src/components/searchBar";
import { ProjectsList } from "src/components/projectList";

import type { Project } from "types/project";
import { Box, Center } from "@chakra-ui/react";
import getAllProjects from "services/project/getAllProjects";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading } from "src/components/loading";
import { Error } from "src/components/error";

const ProjectsPage: NextPage = () => {
  const { t } = useTranslation("projects");

  // TODO: use react-query
  const { isError, data } = useQuery(getAllProjects({}));

  if (isError) return <Error />;
  if (!data) return <Loading />;

  return (
    <BasicLayout pageTitle={t("pageTitle")}>
      <Center mt={10}>
        <SearchBar
          boxProps={{ w: "80%" }}
          inputProps={{ boxShadow: "2px 2px 4px #C0C0C0" }}
          inputGroupProps={{ h: "45px" }}
        />
      </Center>
      <Box px={10}>
        <ProjectsList projects={data!} />
      </Box>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getAllProjects({}));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "projects"])),
    },
  };
};

export default ProjectsPage;
