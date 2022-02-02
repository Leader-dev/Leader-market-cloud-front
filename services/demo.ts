import { request } from "utils/request";
import { createService } from "services";

type Thing = string;

// this is a demo for a service definition
export default createService<`Hello ${Thing}`>({
  url: () => "/demo",
  get: (url) => request.get(url).then((res) => res.data),
});

/*
import { useQuery } from "react-query";
import demo from "services/demo";

const App = () => {
  const {data, isLoading} = useQuery(demo({}));
  return <div>{isLoading ? "Loading" : data}</div>
}
*/
