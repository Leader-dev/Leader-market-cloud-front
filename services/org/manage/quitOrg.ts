import { request } from "utils/request";
import { createService } from "services/index";

export default createService<any, { orgId: string }>({
  url: (orgId) => `/mc/org/manage/quit?orgId=${orgId}`,
  get: (url) => request.post(url).then(({ data }) => data),
});
