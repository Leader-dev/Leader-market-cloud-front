import { request } from "utils/request";
import { createService } from "services";

// this is a demo for a service definition
export default createService<{ data: { demo: "Hello World!" | string } }>({
  url: () => "/demo",
  get: (url) => request.get(url),
});
