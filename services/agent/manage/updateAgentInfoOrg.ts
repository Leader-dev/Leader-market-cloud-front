import { request } from "utils/request";
import { createService } from "services/index";
import { Id } from "types/common";

export default createService<{}, { orgId: Id }>({
  url: () => "/mc/agent/manage/info/update/orgId",
  get: (url, { orgId }) =>
    request.post(url, { orgId: orgId }).then(({ data }) => data),
});
