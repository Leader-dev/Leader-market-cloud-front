type Url = string;

/** factory function to create a service */
export const createService = <R, T extends {} = {}>({
  url,
  get,
}: {
  /** a pure function that returns the url the service uses from the params given */
  url: (params: T) => Url;
  /** perform an async fetch given the url and params */
  get: (url: Url, params: T) => Promise<R>;
}) => {
  return (params: T) => ({
    queryKey: [url(params), params],
    queryFn: () => get(url(params), params),
  });
};
