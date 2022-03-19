import { request } from "utils/request";
import { createService } from "services/index";

type OrgManageRolesResponse = {
  isMember: boolean;
  isAdmin: boolean;
}

export default createService<OrgManageRolesResponse, { orgId: string }>({
  url: (orgId) => `/org/manage/roles?orgId=${orgId}`,
  get: (url, { orgId })=> request.get(url, {params: {orgId: orgId}}).then(({ data }) => data.data),
});
