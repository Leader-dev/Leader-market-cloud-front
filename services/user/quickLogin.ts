import { request } from "utils/request";
import { createService } from "services";

type QuickLoginParams = {
  phone: string;
  authcode: string;
};

export default createService<any, QuickLoginParams>({
  url: () => "/user/quick-login",
  get: (url) => request.post(url).then(({ data }) => data),
});
