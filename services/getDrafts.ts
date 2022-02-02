import { request } from "utils/request";
import { createService } from "services";

import { Project } from "types/project";

export default createService<Array<Project>>({
  url: () => `/get-drafts`,
  get: async (url) => [
    {
      id: 1,
      title: "Project 1",
      banner: "https://picsum.photos/id/1/400/300",
      owner: {
        id: 1,
        username: "Example Partner",
      },
      tags: ["just saying", "i have no idea", "watg tags w gonna use"],
    },
    {
      id: 1,
      title: "Project 1",
      banner: "https://picsum.photos/id/1/400/300",
      owner: {
        id: 1,
        username: "Example Partner",
      },
      tags: ["just saying", "i have no idea", "watg tags w gonna use"],
    },
    {
      id: 1,
      title: "Project 1",
      banner: "https://picsum.photos/id/1/400/300",
      owner: {
        id: 1,
        username: "Example Partner",
      },
      tags: ["just saying", "i have no idea", "watg tags w gonna use"],
    },
    {
      id: 1,
      title: "Project 1",
      banner: "https://picsum.photos/id/1/400/300",
      owner: {
        id: 1,
        username: "Example Partner",
      },
      tags: ["just saying", "i have no idea", "watg tags w gonna use"],
    },
  ],
});
