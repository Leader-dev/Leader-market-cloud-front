import { request } from "utils/request";
import { createService } from "services/index";
import {User} from "types/user";
import {Id} from "types/common";


export default createService<User, { agentId: Id }>({
  url: () => "/agent/detail",
  get: (url, { agentId })=> request.get(url, {params: {agentId: agentId}}).then(({ data }) => data.detail),
});
