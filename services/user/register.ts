import { request } from "utils/request";
import { createService } from "services";

type RegisterParams = {
  phone: string;
  authcode: string;
  password: string;
  nickname: string;
}

export default createService<any, RegisterParams>({
  url: () => "/user/quick-login",
  get: (url) => request.post(url).then(({ data }) => data),
});
