import { request } from "utils/request";
import { createService } from "services/index";
import { Org } from "types/user";
import { Id } from "types/common";

export default createService<Org, { orgId: Id }>({
  url: () => "/mc/org/detail",
  get: (url, { orgId }) =>
    request
      .get(url, { params: { orgId: orgId } })
      .then(({ data }) => data.info),
});
