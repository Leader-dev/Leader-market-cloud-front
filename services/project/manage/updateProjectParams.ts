import { request } from "utils/request";
import { createService } from "services/index";
import { EditableProject } from "types/project";

export default createService<any, EditableProject>({
  url: () => "/mc/project/manage/update",
  get: (url) => request.get(url).then(({ data }) => data),
});
