import { request } from "utils/request";
import { createService } from "services";

export default createService<any, any>({
  url: () => "/user/logout",
  get: (url) => request.post(url).then(({ data }) => data),
});
