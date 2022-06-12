import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { BasicLayout } from "layouts/basicLayout";
import { SearchBar } from "components/searchBar";
import { ProjectsList } from "components/projectList";

import { Box, Center } from "@chakra-ui/react";
import getAllProjects from "services/project/getAllProjects";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading } from "components/loading";
import { Error } from "components/error";

const ProjectsPage: NextPage = () => {
  const { t } = useTranslation("projects");

  // TODO: use react-query
  const { isError, data, isLoading } = useQuery(getAllProjects({}));

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

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
