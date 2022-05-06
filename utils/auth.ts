import { useQuery } from "react-query";
import userId from "services/user/userid";

export const useLoginStatus = () => {
  const { data } = useQuery(userId({}));
  return data ? data : false;
};
