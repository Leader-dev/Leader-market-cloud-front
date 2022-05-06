import { Org, Agent } from "./user";
import { Id, Timestamp } from "./common";

export type EditableProject = {
  id: Id;
  /** title of project */
  title: string;
  /** image url of banner */
  tags: string[];
  coverUrl: string;
};

export type Project = EditableProject & {
  draft: boolean;
  status: "active" | "pass";
  publishDate: Timestamp;
  updateDate: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  orgId: Id;
  orgInfo: Org;
  agentId: Id;
  agentInfo: Agent;
  readCount: number;
  content: string;
};
