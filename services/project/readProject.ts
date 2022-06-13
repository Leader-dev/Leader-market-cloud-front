import { request } from "utils/request";
import { Id } from "types/common";
import { useMutation, useQueryClient } from "react-query";
import { Project } from "types/project";

const readProject = (projectId: Id) => {
  return request.post("/mc/project/read", { projectId: projectId });
};

export default (projectId: Id) => {
  const queryClient = useQueryClient();
  return useMutation(readProject, {
    onMutate: async (projectId: Id) => {
      await queryClient.cancelQueries([
        "/mc/project/detail",
        { projectId: projectId },
      ]);
      await queryClient.cancelQueries(["/mc/project/list/all", {}]);
      const previousDetail = queryClient.getQueryData([
        "/mc/project/detail",
        { projectId: projectId },
      ]);
      const previousList = queryClient.getQueryData([
        "/mc/project/list/all",
        {},
      ]);
      queryClient.setQueryData<Project | undefined>(
        ["/mc/project/detail", { projectId: projectId }],
        (oldProject) => {
          console.log("oldProject", oldProject);
          return (
            oldProject && { ...oldProject, readCount: oldProject.readCount + 1 }
          );
        }
      );
      queryClient.setQueryData<Project[] | undefined>(
        ["/mc/project/list/all", {}],
        (oldList) =>
          oldList &&
          oldList.map((project) =>
            project.id === projectId
              ? { ...project, readCount: project.readCount + 1 }
              : project
          )
      );
      return { previousDetail, previousList };
    },
    onError: (err, updatedAgent, context) => {
      queryClient.setQueryData(
        ["/mc/project/detail", { projectId: projectId }],
        context?.previousDetail
      );
      queryClient.setQueryData(["/mc/agent/list", {}], context?.previousList);
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        "/mc/project/detail",
        { projectId: projectId },
      ]);
    },
  });
};
