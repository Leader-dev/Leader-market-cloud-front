import { request } from "utils/request";
import { createService } from "services/index";
import { EditableProject } from "types/project";
import { Id } from "types/common";

type UpdateProjectParams = EditableProject & {
  id: Id;
};

export default createService<any, EditableProject>({
  url: () => "/mc/project/manage/update",
  get: (url, params) =>
    request.post(url, { info: params }).then(({ data }) => data),
});
