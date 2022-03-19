import { request } from "utils/request";
import { createService } from "services";

export default createService<boolean, { phone: string }>({
  url: () => "/user/exist",
  get: (url) => request.post(url).then(({ data }) => data.exsit),
});
