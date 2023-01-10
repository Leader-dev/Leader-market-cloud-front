import { request } from "utils/request";
import { AgentProfile } from "types/user";
import { useMutation, useQueryClient } from "react-query";
import { uploadImage } from "services/image/uploadImage";

type updateAgentParams = Omit<AgentProfile, "avatarUrl"> & {
  avatarUrl: File | string;
};

const updateAgentInfo = async (info: updateAgentParams) => {
  if (typeof info.avatarUrl !== "string") {
    const avatarUrl = await uploadImage(info.avatarUrl).catch(() => {
      console.error("Error uploading image");
      return "Error uploading image";
    });
    info.avatarUrl = avatarUrl;
    console.log(avatarUrl);
    await request.post("/mc/agent/manage/info/update/avatarUrl", {
      avatarUrl: avatarUrl,
    });
  }
  await request
    .post("/mc/agent/manage/info/update", { info: info })
    .then(({ data }) => {
      console.log(data.detail);
      return data.detail as AgentProfile;
    });
};

export default () => {
  const queryClient = useQueryClient();
  return useMutation(updateAgentInfo, {
    // onMutate: async (info: AgentProfile) => {
    //   await queryClient.cancelQueries(["/mc/agent/manage/info", {}]);
    //   const previousInfo = queryClient.getQueryData([
    //     "/mc/agent/manage/info",
    //     {},
    //   ]);
    //   queryClient.setQueryData<AgentProfile | undefined>(
    //     ["/mc/agent/manage/info", {}],
    //     info
    //   );
    //   return { previousInfo };
    // },
    // onError: (err, updatedAgent, context) => {
    //   queryClient.setQueryData(
    //     ["/mc/agent/manage/info", {}],
    //     context?.previousInfo
    //   );
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries(["/mc/agent/manage/info", {}]);
    // },
    onSuccess: (data, variables) => {
      // TODO: data is undefined
      console.log(data, variables);
      queryClient.setQueryData(["/mc/agent/manage/info", {}], variables);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
