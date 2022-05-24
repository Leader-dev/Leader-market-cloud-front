import { request } from "utils/request";
import { getPublicKey } from "./getPublicKey";

type RegisterParams = {
  phone: string;
  authcode: string;
  password: string;
  nickname: string;
};

export const register = async (data: RegisterParams) => {
  const { password } = data;
  const p = getPublicKey();
  const { JSEncrypt } = await import("jsencrypt");
  const crypt = new JSEncrypt({});
  const publicKey = await p;
  crypt.setKey(publicKey);
  const encryptedPassword = crypt.encrypt(password);
  await request.post(
    "/user/register",
    { ...data, password: encryptedPassword },
    {
      codeHandlers: {
        400: ({ response }) => {
          throw response.data.error;
        },
      },
    }
  );
};
