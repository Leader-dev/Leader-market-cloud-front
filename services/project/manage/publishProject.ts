import { request } from "utils/request";
import { EditableProject } from "types/project";
import { uploadImage } from "services/image/uploadImage";

type publishProjectArgs = Omit<EditableProject, "coverUrl"> & {
  coverUrl: File | null;
};

export default async function publishProject(data: publishProjectArgs) {
  // console.log(data);
  const coverUrl = await uploadImage(data.coverUrl!!);
  const projectInfo: EditableProject = { ...data, coverUrl: coverUrl };
  // TODO remove these
  projectInfo.tags = ["online"];
  await request
    .post("/mc/project/manage/publish", {
      info: { ...projectInfo },
    })
    .then(({ data }) => console.log(data));
}
