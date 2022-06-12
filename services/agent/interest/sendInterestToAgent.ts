import { request } from "utils/request";
import { Id } from "types/common";

export const sendInterestToAgent = (agentId: Id) => {
  return request.post("/mc/agent/interest/send", { agentId: agentId });
};
