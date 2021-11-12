import { request } from "utils/request";
import { createService } from "services";
import { Org } from "types/user";
import { Project } from "types/project";

export default createService<
  Org & { projects: Omit<Project, "owner">[] },
  { id: string }
>({
  url: ({ id }: { id: string }) => `/get-org-detail?id=${id}`,
  // mocked data
  get: async (url, { id }) => ({
    id: 1,
    name: "Example Org",
    avatar: "https://picsum.photos/id/1/400/300",
    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    projects: [
      {
        id: 1,
        title: "Example Project",
        banner: "https://picsum.photos/id/1/400/300",
      },
    ],
  }),
});
