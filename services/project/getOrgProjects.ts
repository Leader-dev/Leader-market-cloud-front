import { request } from "utils/request";
import { createService } from "services/index";
import {Project} from "types/project";
import {Id} from "types/common";


export default createService<Project[], { orgId: Id }>({
  url: () => "/project/list/org",
  get: (url, { orgId })=> request.get(url, {params: {orgId: orgId}}).then(({ data }) => data.list),
});
