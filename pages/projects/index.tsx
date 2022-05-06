import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { BasicLayout } from "layouts/basicLayout";
import { SearchBar } from "components/searchBar";
import { ProjectsList } from "components/projectList";

import type { Agent } from "types/user";
import type { Project } from "types/project";
import { Center } from "@chakra-ui/react";
import getAllProjects from "services/project/getAllProjects";
import { useQuery } from "react-query";
import { Loading } from "components/loading";
import { Error } from "components/error";

const ProjectsPage: NextPage = () => {
  const { t } = useTranslation("projects");

  // TODO: use react-query
  const { isError, data } = useQuery("getAllProjects", getAllProjects(null));

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
      <ProjectsList projects={data!} />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "projects"])),
  },
});

export default ProjectsPage;
