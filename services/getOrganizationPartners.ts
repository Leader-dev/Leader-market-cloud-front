import { request } from "utils/request";
import { createService } from "services";
import { OrgProfile } from "types/user";

export default createService<OrgProfile[]>({
  url: () => "/get-organization-partners",
  //   get: (url) => request.get(url).then(({ data }) => data.partners),
  get: async (url) => [
    {
      id: 1,
      name: "Example Partner",
      avatar: "https://picsum.photos/id/1/400/300",
      bio: "This is an example partner, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      memberCount: 17,
      projectCount: 8,
    },
    {
      id: 2,
      name: "深圳搞笑联盟",
      avatar: "https://picsum.photos/id/1/400/300",
      bio: "This is an example partner, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      memberCount: 8,
      projectCount: 12,
    },
    {
      id: 3,
      name: "摆烂前线",
      avatar: "https://picsum.photos/id/1/400/300",
      bio: "This is an example partner, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      memberCount: 113,
      projectCount: 514,
    },
  ],
});
