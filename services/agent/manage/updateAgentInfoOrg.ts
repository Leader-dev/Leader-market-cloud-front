import { request } from "utils/request";
import { createService } from "services/index";
import {Id} from "types/common";


export default createService<{}, { orgId: Id }>({
  url: () => "/agent/manage/info/update/orgId",
  get: (url, {orgId}) => request.get(url, {params: {orgId: orgId}}).then(({ data }) => data)
});
