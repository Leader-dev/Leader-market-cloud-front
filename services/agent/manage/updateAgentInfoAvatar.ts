import { request } from "utils/request";
import { createService } from "services/index";

export default createService<{}, { avatarUrl: string }>({
  url: () => "/mc/agent/manage/info/update/avatarUrl",
  get: (url, { avatarUrl }) =>
    request.post(url, { avatarUrl: avatarUrl }).then(({ data }) => data),
});
