import { Id } from "./common";

export type EditableAgent = {
  name: string;
  description: string;
  showContact: boolean;
  phone: string;
  email: string;
};

export type Agent = EditableAgent & {
  id: Id;
  /** url of avatar */
  userId: Id;
  displayOrgId: Id;
  avatarUrl: string;
  orgInfo: Org;
  interested: boolean;
  favorite: boolean;
  projectCount: number;
  readCount: number;
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
