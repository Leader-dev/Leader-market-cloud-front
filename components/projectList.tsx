import { SimpleGrid, Box, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Card } from "components/card";
import { SiteLink } from "components/siteLink";
import { Tags } from "components/tags";

import { Project } from "types/project";

type HasOwnerProjectsListProps = {
  hasOwner: true;
  projects: Project[];
};
type NotHasOwnerProjectsListProps = {
  hasOwner?: false;
  projects: Omit<Project, "owner">[];
};

type ProjectsListProps =
  | HasOwnerProjectsListProps
  | NotHasOwnerProjectsListProps;

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  hasOwner,
}) => {
  const { push } = useRouter();

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
        <Box key={project.id}>
          <Card
            borderRadius="0"
            variant="interactive"
            onClick={() => {
              push(`/projects/${project.id}`);
            }}
          >
            <Card.Media>
              {/* <NextImage src={project.banner} alt={project.title} /> */}
              <Img w="100%" src={project.banner} alt={project.title} />
            </Card.Media>
            <Card.Content px={5} py={3}>
              <Box fontSize="md">{project.title}</Box>
              {hasOwner && (
                <Box>
                  <SiteLink
                    // @ts-ignore
                    href={`/partners/${project.owner.id}`}
                    color="blue.600"
                  >
                    @
                    {
                      // @ts-ignore
                      project.owner.username
                    }
                  </SiteLink>
                </Box>
              )}
              <Tags tags={project.tags} />
            </Card.Content>
          </Card>
        </Box>
      ))}
    </SimpleGrid>
  );
};
