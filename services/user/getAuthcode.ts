import { request } from "utils/request";
import { createService } from "services";

export const getAuthCode = async (params: { phone: string }) => {
  return await request
    .post("/account/user/authcode", params)
    .then(({ data }) => data);
};
