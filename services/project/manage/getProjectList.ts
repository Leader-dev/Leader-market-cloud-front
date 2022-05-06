import { request } from "utils/request";
import { createService } from "services/index";
import { Project } from "types/project";

export default createService<Project[]>({
  url: () => "/mc/project/manage/list",
  get: (url) => request.get(url).then(({ data }) => data.list),
});
