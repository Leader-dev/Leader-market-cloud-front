import { request } from "utils/request";

export const getAuthCode = async (params: { phone: string }) => {
  return await request.post("/user/authcode", params).then(({ data }) => data);
};
