import { request } from "utils/request";
import { createService } from "services/index";
import { Agent } from "types/user";
import { Id } from "types/common";

type getAgentInfoResponse = Omit<Agent, "orgInfo"> & {
  userId: string;
  orgId: Id;
};

export default createService<getAgentInfoResponse>({
  url: () => "/mc/agent/manage/info",
  get: (url) => request.post(url).then(({ data }) => data.info),
});
