import { request } from "utils/request";
import { createService } from "services/index";
import { Agent } from "types/user";

export default createService<Agent[]>({
  url: () => "/mc/agent/list",
  get: (url) => request.post(url).then(({ data }) => data.list),
});
