import { request } from "utils/request";
import { createService } from "services";

export default createService<string>({
  url: () => "/user/phone",
  get: (url) => request.post(url).then(({ data }) => data.phone),
});
