import { request } from "utils/request";

export const getPublicKey = async (): Promise<string> => {
  return (await request.post("/user/key")).data.publicKey;
};
