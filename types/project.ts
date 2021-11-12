import { User } from "./user";

export type Project = {
  /** title of project */
  title: string;
  owner: User;
  /** image url of banner */
  banner: string;
  id: any;
};

export type ProjectDetail = Project & {
  /** rich text */
  description: string;
};
