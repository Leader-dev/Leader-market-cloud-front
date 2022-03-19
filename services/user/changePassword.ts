import { request } from "utils/request";
import { createService } from "services";

export default createService<any, { phone: string, password: string }>({
  url: () => "/user/check-password",
  get: (url) => request.post(url).then(({ data }) => data),
});
