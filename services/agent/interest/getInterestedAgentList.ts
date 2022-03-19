import { request } from "utils/request";
import { createService } from "services/index";
import {User} from "types/user";


type getInterestedAgentResponse = {
  interest: User[];
  beingInterest: User[];
}

export default createService<getInterestedAgentResponse>({
  url: () => "/agent/interest/list",
  get: (url) => request.get(url).then(({ data }) => data.list)
});
