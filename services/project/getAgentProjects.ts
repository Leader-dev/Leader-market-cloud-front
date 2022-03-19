import { request } from "utils/request";
import { createService } from "services/index";
import {Project} from "types/project";
import {Id} from "types/common";


export default createService<Project[], { agentId: Id }>({
  url: () => "/project/list/agent",
  get: (url, { agentId })=> request.get(url, {params: {agentId: agentId}}).then(({ data }) => data.list),
});
