import { request } from "utils/request";
import { Id } from "types/common";
import { useMutation, useQueryClient } from "react-query";
import { Agent } from "types/user";

const sendInterestToAgent = (agentId: Id) => {
  return request.post("/mc/agent/interest/send", { agentId: agentId });
};

export const useSendInterestToAgent = (agentId: Id) => {
  const queryClient = useQueryClient();

  return useMutation(sendInterestToAgent, {
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["/mc/agent/list", {}]);

      // Snapshot the previous value
      const previousAgents = queryClient.getQueryData(["/mc/agent/list", {}]);

      // Optimistically update to the new value
      queryClient.setQueryData(["/mc/agent/list", {}], (old) =>
        old.map((agent: Agent) =>
          agent.id === agentId ? { ...agent, interested: true } : agent
        )
      );
      // Return a context object with the snapshotted value
      return { previousAgents };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, updatedAgent, context) => {
      queryClient.setQueryData(["/mc/agent/list", {}], context.previousAgents);
    },
    // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries(["/mc/agent/list", {}]);
    // },
  });
};
