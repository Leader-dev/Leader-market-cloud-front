import { request } from "utils/request";
import { createService } from "services/index";
import {EditableProject} from "types/project";


export default createService<any, EditableProject>({
  url: () => "/project/manage/publish",
  get: (url) => request.get(url).then(({ data }) => data)
});
