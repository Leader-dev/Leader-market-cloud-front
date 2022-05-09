import { request } from "utils/request";
import { createService } from "services/index";
import { Id } from "types/common";

export default createService<any, { projectId: Id }>({
  url: () => "/mc/project/read",
  get: (url, { projectId }) =>
    request
      .post(url, { projectId: projectId })
      .then(({ data }) => data.code),
});
