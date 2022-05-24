import { request } from "utils/request";
import { createService } from "services";

export default createService<string, { password: string }>({
  url: () => "/user/userid",
  get: (url, params) =>
    request.post(url, params).then(({ data }) => data.userId),
});
