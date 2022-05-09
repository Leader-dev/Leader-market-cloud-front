import { request } from "utils/request";
import { createService } from "services/index";
import { EditableAgent } from "types/user";

export default createService<{}, EditableAgent>({
  url: () => "/mc/agent/manage/info/update",
  get: (url, info) =>
    request.post(url, { info: info }).then(({ data }) => data),
});
