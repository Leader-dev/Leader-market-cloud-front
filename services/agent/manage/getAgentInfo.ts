import { request } from "utils/request";
import { createService } from "services/index";
import {User} from "types/user";
import {Id} from "types/common";

type getAgentInfoResponse = Omit<User, "orgInfo"> & {
  userId: string;
  orgId: Id;
}

export default createService<getAgentInfoResponse>({
  url: () => "/agent/manage/info",
  get: (url)=> request.get(url).then(({ data }) => data.info),
});
