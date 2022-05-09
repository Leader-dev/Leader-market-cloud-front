import { request } from "utils/request";
import { createService } from "services/index";
import { Project } from "types/project";
import { Id } from "types/common";

export default createService<Project[], { orgId: Id }>({
  url: () => "/mc/project/list/org",
  get: (url, { orgId }) =>
    request
      .post(url, { orgId: orgId })
      .then(({ data }) => data.list),
});
