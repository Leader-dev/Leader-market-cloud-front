import { request } from "utils/request";
import { createService } from "services/index";
import { EditableProject } from "types/project";

export default createService<any, EditableProject>({
  url: () => "/mc/project/manage/publish",
  get: (url, params) => request.post(url, {info: params}).then(({ data }) => data),
});
