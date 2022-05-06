import { request } from "utils/request";
import { createService } from "services/index";
import { Project } from "types/project";

export default createService<Project[], any>({
  url: () => "/mc/project/list/all",
  get: (url) => request.get(url).then(({ data }) => data.list),
});
