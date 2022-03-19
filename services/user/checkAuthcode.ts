import { request } from "utils/request";
import { createService } from "services";

export default createService<any, { phone: string, authcode: string }>({
  url: () => "/user/check-authcode",
  get: (url) => request.post(url).then(({ data }) => data),
});
