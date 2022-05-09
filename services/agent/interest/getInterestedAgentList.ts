import { request } from "utils/request";
import { createService } from "services/index";
import { Agent } from "types/user";

type getInterestedAgentResponse = {
  interest: Agent[];
  beingInterest: Agent[];
};

export default createService<getInterestedAgentResponse>({
  url: () => "/mc/agent/interest/list",
  get: (url) => request.post(url).then(({ data }) => data.list),
});
