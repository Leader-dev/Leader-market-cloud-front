import type { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { BasicLayout } from "layouts/basicLayout";
import { SearchBar } from "components/searchBar";
import { ProjectsList } from "components/projectList";


import type { User } from "types/user";
import type { Project } from "types/project";
import {Center} from "@chakra-ui/react";

const ProjectsPage: NextPage = () => {
  const { t } = useTranslation("projects");

  // TODO: use react-query
  const projects: Project[] = [
    {
      title: "【为危机博弈】第七届商赛",
      owner: {
        username: "林晓晓",
        id: "12345",
      },
      id: 1,
      banner: "https://picsum.photos/id/1/400/300",
      tags: ["商赛", "线下", "需要资金"],
    },
    {
      title: "【为危机博弈】第七届商赛",
      owner: {
        username: "林晓晓",
        id: "12345",
      },
      id: 2,
      banner: "https://picsum.photos/id/1/400/300",
      tags: ["赞助商", "提供资金"],
    },
    {
      title: "【为危机博弈】第七届商赛",
      owner: {
        username: "林晓晓",
        id: "12345",
      },
      id: 3,
      banner: "https://picsum.photos/id/1/400/300",
      tags: ["网课"],
    },
  ];
  return (
    <BasicLayout pageTitle={t("pageTitle")}>
      <Center mt={10} >
        <SearchBar
          boxProps={{w: '80%'}}
          inputProps={{boxShadow: '2px 2px 4px #C0C0C0'}}
          inputGroupProps={{h: '45px'}}
        />
      </Center>
      <ProjectsList projects={projects} />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "projects"])),
  },
});

export default ProjectsPage;
