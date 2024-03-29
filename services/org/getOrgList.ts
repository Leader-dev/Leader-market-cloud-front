import { request } from "utils/request";
import { createService } from "services/index";
import { Org } from "types/user";

export default createService<Org[]>({
  url: () => "/mc/org/list",
  get: (url) => request.post(url).then(({ data }) => data.list),
});
