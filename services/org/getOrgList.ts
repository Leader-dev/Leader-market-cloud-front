import { request } from "utils/request";
import { createService } from "services/index";
import { Org } from "types/user";


export default createService<Org[]>({
  url: () => "/org/list",
  get: (url)=> request.get(url).then(({ data }) => data.list),
});
