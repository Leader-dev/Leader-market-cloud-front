import { request } from "utils/request";
import { createService } from "services/index";
import { Id } from "types/common";

export default createService<any, { projectId: Id }>({
  url: () => "/mc/project/manage/delete",
  get: (url, projectId) =>
    request
      .get(url, { params: { projectId: projectId } })
      .then(({ data }) => data),
});
