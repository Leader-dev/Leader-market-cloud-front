import { request } from "utils/request";

export const getPublicKey = async (): Promise<string> => {
  return (await request.post("/account/user/key")).data.publicKey;
};
