import { Org, Agent } from "./user";
import { Id, Timestamp } from "./common";

export type EditableProject = {
  /** title of project */
  title: string;
  /** image url of banner */
  tags: string[];
  coverUrl: string;
  startDate: Timestamp;
  endDate: Timestamp;
  status: "active" | "pass";
  content: string;
  draft: boolean;
  orgId: Id | null;
  imageUrls: string[];
};

export type Project = EditableProject & {
  id: Id;
  publishDate: Timestamp;
  updateDate: Timestamp;
  orgInfo: Org;
  publisherAgentId: Id;
  publisherAgentInfo: Agent;
  readCount: number;
};
