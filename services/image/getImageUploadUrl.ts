import { request } from "utils/request";

export const getImageUploadURL = async () => {
  return (await request.post("/service/image/get-upload-url")).data.url.replace(
    "http://",
    "https://"
  ) as string;
};


export const getMultipleImageUploadURL = async ({
  count,
}: {
  count: number;
}) => {
  return (
    await request.post("/service/image/get-upload-url-multiple", {
      urlCount: count,
    })
  ).data.urls.map((url: string) => url.replace(
    "http://",
    "https://")) as string[];
};

