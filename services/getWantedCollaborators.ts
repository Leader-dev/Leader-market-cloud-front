import { request } from "utils/request";
import { createService } from "services";
import { UserProfile, ContactDetails } from "types/user";

type CollaboratorList = Array<
  Omit<UserProfile, "projects"> & { contacts: ContactDetails }
>;

export default createService<{
  with_me: CollaboratorList;
  i_want: CollaboratorList;
}>({
  url: () => `/get-wanted-collaborators`,
  get: async () => ({
    with_me: [
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
        contacts: {
          email: "support@outlook.com",
          phone: "12345678900",
        },
      },
      {
        id: 2,
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
        contacts: {
          email: "support@outlook.com",
        },
      },
      {
        id: 3,
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
        contacts: {},
      },
    ],
    i_want: [
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
        contacts: {},
      },
      {
        id: 2,
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
        contacts: {
          phone: "+114 5141919810",
        },
      },
    ],
  }),
});
