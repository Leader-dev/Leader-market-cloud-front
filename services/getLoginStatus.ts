import { request } from "utils/request";
import { createService } from "services";
import { User } from "types/user";

export default createService<false | User>({
  url: () => "/get-login-status",
  // get: (url) => request.get(url).then(({ data }) => data.status),
  // get: async (url) => false,
  get: async (url) => ({
    id: 1,
    username: "Example User",
    avatar: "https://picsum.photos/id/1/400/300",
  }),
});
