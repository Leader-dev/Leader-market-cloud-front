import { request } from "utils/request";
import { createService } from "services";

type LoginParams = {
  phone: string;
  authcode: string | null;
  password: string | null;
};

export default createService<any, LoginParams>({
  url: () => "/user/login",
  get: (url) => request.post(url).then(({ data }) => data),
});
