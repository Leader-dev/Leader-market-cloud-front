import { request } from "utils/request";
import { createService } from "services/index";
import { Project } from "types/project";

type DraftProject = Omit<Project, "draft">;

export default createService<DraftProject[]>({
  url: () => "/mc/project/manage/drafts",
  get: (url) => request.get(url).then(({ data }) => data.list),
});
