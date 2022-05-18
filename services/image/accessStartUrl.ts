import { request } from "utils/request";
import { createService } from "services/index";

export default createService<String, any>({
  url: () => "/service/image/access-start-url",
  get: (url) => request.post(url).then(({ data }) => data.start),
});
