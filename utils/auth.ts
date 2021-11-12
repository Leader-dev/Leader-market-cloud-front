import { useQuery } from "react-query";
import getLoginStatus from "services/getLoginStatus";

export const useLoginStatus = () => {
  const { data } = useQuery(getLoginStatus({}));
  return data ? data.id : false;
};
