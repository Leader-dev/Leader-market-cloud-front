import { request } from "utils/request";
import { createService } from "services";

export const checkAuthCode = async (params: {
  phone: string;
  authcode: string;
}) => {
  return await request
    .post("/account/user/check-authcode", params)
    .then(({ data }) => data);
};
