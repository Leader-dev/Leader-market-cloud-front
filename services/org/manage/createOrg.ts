import { request } from "utils/request";
import { createService } from "services/index";
import {Org} from "types/user";


export default createService<any, Omit<Org, "certification"|"id">>({
  url: () => "/org/manage/create",
  get: (url) => request.get(url).then(({ data }) => data)
});
