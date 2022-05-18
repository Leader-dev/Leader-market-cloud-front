import { request } from "utils/request";
import { createService } from "services/index";
import { EditableOrg } from "types/user";

// export default createService<any, EditableOrg>({
//   url: () => "/mc/org/manage/create",
//   get: (url, params) =>
//     request.post(url, { info: params }).then(({ data }) => data),
// });

export default async function createOrg(data: EditableOrg) {
  await request.post("/mc/org/manage/create", { info: data });
}
