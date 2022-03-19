import { request } from "utils/request";
import { createService } from "services/index";
import {EditableOrg} from "types/user";


export default createService<any, EditableOrg>({
  url: () => "/org/manage/create",
  get: (url) => request.get(url).then(({ data }) => data)
});
