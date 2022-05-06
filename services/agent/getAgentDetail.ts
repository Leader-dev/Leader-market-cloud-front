import { request } from "utils/request";
import { createService } from "services/index";
import { Agent } from "types/user";
import { Id } from "types/common";

export default createService<Agent, { agentId: Id }>({
  url: () => "/mc/agent/detail",
  get: (url, { agentId }) =>
    request
      .get(url, { params: { agentId: agentId } })
      .then(({ data }) => data.detail),
});
