import { request } from "utils/request";
import { createService } from "services/index";
import { Agent } from "types/user";

export default createService<Agent>({
  url: () => "/mc/agent/manage/id",
  get: (url) => request.get(url).then(({ data }) => data.info),
});
