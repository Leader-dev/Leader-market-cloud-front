import { request } from "utils/request";
import { EditableProject } from "types/project";
import { uploadImage } from "services/image/uploadImage";

type publishProjectArgs = Omit<EditableProject, "coverUrl"> & {
  coverUrl: File | null;
};

export default async function publishProject(data: publishProjectArgs) {
  console.log(data);
  const coverUrl = await uploadImage(data.coverUrl!!);
  const projectInfo: EditableProject = { ...data, coverUrl: coverUrl };
  // TODO remove these
  projectInfo.draft = false;
  projectInfo.orgId = "6283b6447ace5f1f580e1812";
  projectInfo.startDate = "1609459200";
  projectInfo.endDate = "1609459200";
  projectInfo.tags = ["online"];
  await request.post("/mc/project/manage/publish", {
    info: { ...projectInfo },
  });
}
