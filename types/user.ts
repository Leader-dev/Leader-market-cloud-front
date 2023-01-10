import { Id } from "./common";

export type AgentProfile = {
  name: string;
  description: string;
  showContact: boolean;
  avatarUrl: string;
  phone: string;
  email: string;
  orgId: Id;
  orgInfo: Org;
  id: Id;
  userId: Id;
};

export type Agent = AgentProfile & {
  interested: boolean;
  favorite: boolean;
  projectCount: number;
  readCount: number;
};

export type NameCard = {
  name: string;
  position: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  displayOrgId: Id | undefined;
};

export type EditableOrg = {
  name: string;
  description: string;
  slogan: string;
  avatarUrl: string;
};

export type Org = EditableOrg & {
  id: Id;
  certification: "" | "school" | "student_org" | "social_org";
  memberCount: number;
  projectCount: number;
};
