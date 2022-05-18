import { request } from "utils/request";
import imageCompression from "browser-image-compression";
import { getImageUploadURL, getMultipleImageUploadURL } from "services/image/getImageUploadUrl";
// import { getMultipleImageUploadURL } from "/service/image/getUploadUrlMultiple";

const fullToShort = (url: string) => {
  return url.match(/(v\d_[A-Za-z0-9]+)\?/)![1];
};

const options: Parameters<typeof imageCompression>[1] = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true
};

/** Upload file
 * @example const file = new File([blob], "image.jpg");
 */
export const uploadImage = async (file: File) => {
  const url = await getImageUploadURL();
  const image = await imageCompression(file, options);
  const k = request.put(url, image, {
    headers: { "Content-Type": "" },
    codeHandlers: {},
  });
  const shortUrl = fullToShort(url);
  await k;
  console.log("uploadImage", url, shortUrl);
  return shortUrl;
};

export const uploadImageList = async (images: File[]) => {
  const urls = await getMultipleImageUploadURL({ count: images.length });
  const reqs = (
    await Promise.all(images.map((image) => imageCompression(image, options)))
  ).map((image, i) => {
    return request.put(urls[i], image, { headers: { "Content-Type": "" } });
  });
  await Promise.all(reqs);
  return urls.map(fullToShort);
};
