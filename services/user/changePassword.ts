import { request } from "utils/request";
import { createService } from "services";

export default createService<any, { phone: string; password: string }>({
  url: () => "/account/user/check-password",
  get: (url, params) => request.post(url, params).then(({ data }) => data),
});
