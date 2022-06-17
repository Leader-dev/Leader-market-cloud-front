import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { request } from "utils/request";

const logout = () => {
  return request.post("/user/logout").then(({ data }) => data);
};

export default () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/user/userId", {}]);
      push("/");
    },
  });
};
