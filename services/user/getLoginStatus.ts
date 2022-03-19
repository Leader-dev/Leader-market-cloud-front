import { request } from "utils/request";
import { createService } from "services";

export default createService<string, { password: string }>({
  url: () => "/user/userid",
  get: (url) => request.post(url).then(({ data }) => data.userId),
});
