import { request } from "utils/request";
import { createService } from "services/index";
import { AgentProfile } from "types/user";

export default createService<AgentProfile>({
  url: () => "/mc/agent/manage/info",
  get: (url) => request.post(url).then(({ data }) => data.info),
});
