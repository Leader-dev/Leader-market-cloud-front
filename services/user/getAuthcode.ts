import { request } from "utils/request";
import { createService } from "services";

export default createService<any, { phone: string }>({
  url: () => "/user/authcode",
  get: (url) => request.post(url).then(({ data }) => data),
});
