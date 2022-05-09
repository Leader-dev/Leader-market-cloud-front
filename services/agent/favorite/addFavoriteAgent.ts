import { request } from "utils/request";
import { createService } from "services/index";
import { Id } from "types/common";

export default createService<any, { agentId: Id }>({
  url: () => "/mc/agent/favorite/add",
  get: (url, { agentId }) =>
    request.post(url, { agentId: agentId }).then(({ data }) => data),
});
