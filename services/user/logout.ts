import { request } from "utils/request";
import { createService } from "services";

export default createService<any, any>({
  url: () => "/account/user/logout",
  get: (url) => request.post(url).then(({ data }) => data),
});
