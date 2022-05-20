import {
  SimpleGrid,
  Box,
  Flex,
  Heading,
  Tag,
  Text,
  Avatar,
  Icon,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Project } from "types/project";
import { Tags } from "./tags";
import { useTranslation } from "next-i18next";
import {
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineEye,
} from "react-icons/ai";
import { UseImage } from "src/components/image";

type ProjectInfo = Omit<Project, "draft">;

export const ProjectsList: React.FC<{ projects: ProjectInfo[] }> = ({
  projects,
}) => {
  const { push } = useRouter();
  return (
    <SimpleGrid columns={3} spacingX={20} spacingY={20} py={10}>
      {projects.map((project) => {
        let date = new Date(parseInt(project.publishDate));
        return (
          <Box
            key={project.id}
            onClick={() => {
              push(`/projects/${project.id}`);
            }}
          >
            <Box
              borderRadius="20px"
              w="full"
              overflow="hidden"
              pos="relative"
              className="card"
            >
              <UseImage
                width={4}
                height={3}
                layout="responsive"
                // priority={true}
                src={project.coverUrl}
                alt={project.coverUrl}
                // placeholder="blur"
                // blurDataURL={project.base64}
                // title={project.title}
              />
              <Flex
                pos="absolute"
                bottom={0}
                visibility="hidden"
                color="white"
                w="full"
                h="20%"
                maxH="60px"
                align="center"
                textStyle={"p"}
                px={5}
                bgGradient="linear-gradient(180deg, transparent 5%, rgba(20,20,20,0.7))"
                sx={{
                  ".card:hover &": {
                    visibility: "visible",
                  },
                }}
              >
                {project.title}
              </Flex>
            </Box>
            <Flex px={1} py={3} align="center">
              <Box textStyle="p">
                {/* {date.getMonth() + 1}月{date.getDate()}日, {date.getFullYear()} */}
                {date.toISOString().slice(0, 10)}
              </Box>
              <Spacer />
              <Flex align="center" textStyle="p">
                <Icon w={6} h={6} as={AiOutlineEye} mr={1} />
                {project.readCount}
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export const ProjectsPanelList: React.FC<{ projects: ProjectInfo[] }> = ({
  projects,
}) => {
  const { push } = useRouter();
  const { t } = useTranslation("projects");
  return (
    <Stack align="stretch" spacing={4}>
      {projects.map((project) => {
        const publishDate = new Date(parseInt(project.publishDate));
        const startDate = new Date(parseInt(project.startDate));
        const endDate = new Date(parseInt(project.endDate));
        return (
          <Flex
            key={project.id}
            onClick={() => {
              push(`/projects/${project.id}`);
            }}
          >
            <Box w="30%" variant={"with-shadow"}>
              <Box borderRadius="20px" overflow="hidden">
                <UseImage
                  width={4}
                  height={3}
                  layout="responsive"
                  src={project.coverUrl}
                  alt={project.coverUrl}
                />
              </Box>
              <Flex px={1} py={3}>
                <Box>
                  {/* {publishDate.getMonth() + 1}月{publishDate.getDate()}日,{" "}
                  {publishDate.getFullYear()} */}
                  {publishDate.toISOString().slice(0, 10)}
                </Box>
                <Spacer />
                <Flex align={"center"}>
                  <Icon as={AiOutlineEye} mr={1} />
                  {project.readCount}
                </Flex>
              </Flex>
            </Box>

            <Stack flex="1" pl={20}>
              <Flex justify="space-between" w={"100%"} align={"center"}>
                <Box textStyle="title">{project.title}</Box>
                <Tag
                  colorScheme="blue"
                  variant={"outline"}
                  size={"lg"}
                  h={"50%"}
                >
                  {t(project.status)}
                </Tag>
              </Flex>
              <Flex align={"center"}>
                <Avatar
                  src={
                    project.publisherAgentId
                      ? project.publisherAgentInfo.avatarUrl
                      : project.orgInfo.avatarUrl
                  }
                />
                <Box ml={4}>
                  {project.publisherAgentId
                    ? project.publisherAgentInfo.name
                    : project.orgInfo.name}
                </Box>
              </Flex>
              <Flex align={"center"}>
                <Icon mr={2} as={AiOutlineClockCircle} />
                {startDate.toISOString().slice(0, 19).replace("T", " ")} 至{" "}
                {endDate.toISOString().slice(0, 19).replace("T", " ")}
              </Flex>
              <Flex align={"center"}>
                <Icon mr={2} as={AiOutlineEnvironment} />
                <Tags tags={project.tags} />
              </Flex>
              <Text noOfLines={3}>{project.content}</Text>
            </Stack>
          </Flex>
        );
      })}
    </Stack>
  );
};
