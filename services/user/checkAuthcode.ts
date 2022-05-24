import { request } from "utils/request";

export const checkAuthCode = async (params: {
  phone: string;
  authcode: string;
}) => {
  return await request
    .post("/user/check-authcode", params)
    .then(({ data }) => data);
};
