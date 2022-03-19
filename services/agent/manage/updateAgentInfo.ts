import { request } from "utils/request";
import { createService } from "services/index";
import {EditableUser} from "types/user";


export default createService<{}, EditableUser>({
  url: () => "/agent/manage/info/update",
  get: (url, info) => request.get(url, {params: {info: info}}).then(({ data }) => data)
});
