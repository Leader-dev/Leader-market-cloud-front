import { request } from "utils/request";
import { createService } from "services";
import { UserProfile } from "types/user";

export default createService<UserProfile[]>({
  url: () => "/get-individual-partners",
  //   get: (url) => request.get<{ data: { partners: User[] } }>(url).then(({ data }) => data.partners),
  get: async (url) => [
    {
      id: 1,
      username: "Example Partner",
      avatar: "https://picsum.photos/id/1/400/300",
      bio: "This is JP Morgan working experience 5 years",
      org: {
        id: 1,
        verified: false,
        name: "Shenzhen Business Association",
      },
      projectCount: 2,
      popularity: 75,
    },
    {
      id: 2,
      username: "Example Partner",
      avatar: "https://picsum.photos/id/2/400/300",
      org: {
        id: 2,
        verified: true,
        name: "深圳执行教育科技有限公司",
      },
      projectCount: 12,
      popularity: 3,
    },
    {
      id: 3,
      username: "Example Partner",
      avatar: "https://picsum.photos/id/3/400/300",
      bio: "This is JP Morgan working experience 114514 years. He is 1919810 years old",
      projectCount: 0,
      popularity: 1,
    },
  ],
});
