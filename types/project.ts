import { Org, User } from "./user";
import {Id, Timestamp} from "./common";

export type EditableProject = {
  id: Id;
  /** title of project */
  title: string;
  /** image url of banner */
  tags: string[];
  coverUrl: string;
  status: "active" | "pass";
}

export type Project = EditableProject & {
  draft: boolean;
  publishDate: Timestamp;
  updateDate: Timestamp;
  orgId: Id;
  orgInfo: Org;
  agentId: Id;
  agentInfo: User;
};

export type ProjectDetail = Project & {
  /** rich text */
  content: string;
};
