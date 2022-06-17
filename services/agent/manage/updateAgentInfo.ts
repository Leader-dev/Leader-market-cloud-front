import { request } from "utils/request";
import { AgentProfile } from "types/user";
import { useMutation, useQueryClient } from "react-query";

const updateAgentInfo = (info: AgentProfile) => {
  return request.post("/mc/agent/manage/info/update", { info: info });
};

export default () => {
  const queryClient = useQueryClient();
  return useMutation(updateAgentInfo, {
    onMutate: async (info: AgentProfile) => {
      await queryClient.cancelQueries(["/mc/agent/manage/info", {}]);
      const previousInfo = queryClient.getQueryData([
        "/mc/agent/manage/info",
        {},
      ]);
      queryClient.setQueryData<AgentProfile | undefined>(
        ["/mc/agent/manage/info", {}],
        info
      );
      return { previousInfo };
    },
    onError: (err, updatedAgent, context) => {
      queryClient.setQueryData(
        ["/mc/agent/manage/info", {}],
        context?.previousInfo
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["/mc/agent/manage/info", {}]);
    },
  });
};
