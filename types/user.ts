import { Id } from "./common";

export type User = {
  id: Id;
  /** username */
  username: string;
  /** url of avatar */
  avatar?: string;
  bio?: string;
  org?: {
    id: Id;
    verified: boolean;
    name: string;
  };
};

export type UserProfile = User & {
  projectCount: number;
  popularity: number;
};

export type Org = {
  id: Id;
  name: string;
  avatar: string;
  bio: string;
};

export type OrgProfile = Org & {
  memberCount: number;
  projectCount: number;
};

export type ContactDetails = {
  email?: string;
  phone?: string;
};
