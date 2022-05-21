import { request } from "utils/request";
import { createService } from "services/index";
import { Agent } from "types/user";

type getInterestedAgentResponse = {
  interests: Agent[];
  beingInterested: Agent[];
};

export default createService<getInterestedAgentResponse>({
  url: () => "/mc/agent/interest/list",
  get: (url) => request.post(url).then(({ data }) => data.data),
});
