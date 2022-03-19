import { request } from "utils/request";
import { createService } from "services/index";
import {Id} from "types/common";
import {EditableOrg} from "types/user";

type UpdateOrgParams = EditableOrg & {
  orgId: Id;
}

export default createService<any, UpdateOrgParams>({
  url: (p) => `/org/manage/update?orgId=${p.orgId}`,
  get: (url, params: Omit<UpdateOrgParams, "orgId">) => request.get(url, {params: {info: params}}).then(({ data }) => data)
});
