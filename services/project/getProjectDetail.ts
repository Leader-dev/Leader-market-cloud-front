import { request } from "utils/request";
import { createService } from "services/index";
import {ProjectDetail} from "types/project";
import {Id} from "types/common";


export default createService<ProjectDetail, { projectId: Id }>({
  url: () => "/project/detail",
  get: (url, { projectId })=> request.get(url, {params: {projectId: projectId}}).then(({ data }) => data.detail),
});
