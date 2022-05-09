import { request } from "utils/request";
import { createService } from "services/index";
import { Project } from "types/project";
import { Id } from "types/common";

export default createService<Project, { projectId: Id }>({
  url: () => "/mc/project/detail",
  get: (url, { projectId }) =>
    request.post(url, { projectId: projectId }).then(({ data }) => data.detail),
});
