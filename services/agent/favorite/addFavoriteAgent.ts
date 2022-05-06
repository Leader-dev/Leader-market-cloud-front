import { request } from "utils/request";
import { createService } from "services/index";
import { Id } from "types/common";

export default createService<any, { agentId: Id }>({
  url: () => "/mc/agent/favorite/add",
  get: (url, { agentId }) =>
    request.get(url, { params: { agentId: agentId } }).then(({ data }) => data),
});
