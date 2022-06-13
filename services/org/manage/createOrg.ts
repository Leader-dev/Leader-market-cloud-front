import { request } from "utils/request";
import { EditableOrg } from "types/user";
import { uploadImage } from "services/image/uploadImage";

export default async function createOrg(
  data: Omit<EditableOrg, "avatarUrl"> & { avatarUrl: File | null }
) {
  const avatarUrl = await uploadImage(data.avatarUrl!!);
  if (!avatarUrl) {
    return Promise.reject("Failed to upload image");
  }
  const orgInfo = { ...data, avatarUrl: avatarUrl };
  await request.post("/mc/org/manage/create", { info: orgInfo });
}
