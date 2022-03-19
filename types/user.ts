import { Id } from "./common";

export type EditableUser = {
  name: string;
  description: string;
  showContact: boolean;
  phone: string;
  email: string;
}

export type User = EditableUser & {
  id: Id;
  /** url of avatar */
  avatarUrl: string;
  orgInfo: Org[];
};

export type UserProfile = User & {
  projectCount: number;
  popularity: number;
};

export type EditableOrg = {
  name: string;
  description: string;
  avatarUrl: string;
}

export type Org = EditableOrg & {
  id: Id;
  certification: boolean;
};

export type OrgProfile = Org & {
  memberCount: number;
  projectCount: number;
};

