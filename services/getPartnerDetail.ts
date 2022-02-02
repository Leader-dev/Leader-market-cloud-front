import { request } from "utils/request";
import { createService } from "services";
import { Org, User } from "types/user";
import { Project } from "types/project";

type GetPartnerDetailResponse = (User & {
  projects: Omit<Project, "owner">[];
}) &
  ({ isSelf: false } | { isSelf: true; orgs: Org[] });

export default createService<GetPartnerDetailResponse, { id: string }>({
  url: ({ id }: { id: string }) => `/get-partner-detail?id=${id}`,
  //   get: (url, { id }) =>
  //     request.get(url).then(({ data }) => data.partner),,
  // mocked data
  get: async (url, { id }) => ({
    isSelf: true,
    id: 1,
    username: "Example Partner",
    avatar: "https://picsum.photos/id/1/400/300",
    org: { name: "Eample Org", id: 1, verified: true },
    bio: "Lorem ipsum asuk dolor sit amet consectetur adipisicing elit. Quisquam, quaerat. Lorem ipsum asuk dolor sit amet consectetur adipisicing elit. Quisquam, quaerat.",
    projects: [
      {
        id: 1,
        title: "Example Project",
        banner: "https://picsum.photos/id/1/400/300",
        tags: ["线上", "需要资金"],
      },
      {
        id: 2,
        title: "Example Project",
        banner: "https://picsum.photos/id/1/400/300",
        tags: ["线上", "需要资金"],
      },
      {
        id: 3,
        title: "Example Project",
        banner: "https://picsum.photos/id/1/400/300",
        tags: ["线上", "需要资金"],
      },
      {
        id: 4,
        title: "Example Project",
        banner: "https://picsum.photos/id/1/400/300",
        tags: ["线上", "需要资金"],
      },
    ],
    orgs: [
      {
        id: 1,
        name: "Example Org",
        avatar: "https://picsum.photos/id/1/400/300",
        bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  }),
});
