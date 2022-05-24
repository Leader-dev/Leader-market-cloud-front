import { request } from "utils/request";

import { getPublicKey } from "./getPublicKey";

type LoginParams = {
  phone: string;
  authcode: string | null;
  password: string | null;
};

export const login = async (data: LoginParams) => {
  const { JSEncrypt } = await import("jsencrypt");
  if (data.password) {
    const publicKey = await getPublicKey();
    const encrypt = new JSEncrypt({});
    encrypt.setKey(publicKey);
    data.password = encrypt.encrypt(data.password) || null;
  }
  await request.post("/user/login", data, {
    codeHandlers: {
      400: ({ response }) => {
        throw response.data.error;
      },
    },
  });
};
