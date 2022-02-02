import { Org, User } from "./user";

export type Project = {
  /** title of project */
  title: string;
  owner: User;
  /** image url of banner */
  banner: string;
  id: any;
  tags: string[];
};

export type ProjectDetail = Project & {
  /** rich text */
  description: string;
  status: string;
  org: Org;
};
