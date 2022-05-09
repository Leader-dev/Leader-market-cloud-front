import { request } from "utils/request";
import { createService } from "services/index";
import { EditableOrg } from "types/user";

export default createService<any, EditableOrg>({
  url: () => "/mc/org/manage/create",
  get: (url, params) =>
    request.post(url, { info: params }).then(({ data }) => data),
});
