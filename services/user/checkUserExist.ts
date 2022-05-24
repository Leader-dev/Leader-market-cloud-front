import { request } from "utils/request";
import { createService } from "services";

export default createService<boolean, { phone: string }>({
  url: () => "/user/exist",
  get: (url, params) =>
    request.post(url, params).then(({ data }) => data.exsit),
});
