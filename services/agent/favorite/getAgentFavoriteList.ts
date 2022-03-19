import { request } from "utils/request";
import { createService } from "services/index";
import {User} from "types/user";


export default createService<User[]>({
  url: () => "/agent/favorite/list",
  get: (url)=> request.get(url).then(({ data }) => data.list),
});
