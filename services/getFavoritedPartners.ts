import { request } from "utils/request";
import { createService } from "services";

import { UserProfile, ContactDetails } from "types/user";

export default createService<
  Array<UserProfile & { contacts?: ContactDetails }>
>({
  url: () => "/get-favorited-partners",
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
      contacts: {
        phone: "12345678900",
        email: "firefox@yahoo.com.cn",
      },
    },
  ],
});
