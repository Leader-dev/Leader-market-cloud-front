import { request } from "utils/request";
import { createService } from "services";

export default createService<null>({
  url: () => "/user/logout",
  get: (url) => request.post(url).then(({ data }) => data),
});
