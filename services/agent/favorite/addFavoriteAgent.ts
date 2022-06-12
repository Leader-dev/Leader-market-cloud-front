import { request } from "utils/request";
import { Id } from "types/common";

export const addFavoriteAgent = (agentId: Id) => {
  return request.post("/mc/agent/favorite/add", { agentId: agentId });
};
