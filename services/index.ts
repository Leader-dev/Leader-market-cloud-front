type Url = string;

/**
 * Create a project-specific service definition.
 *
 * @returns The return value is meant to be consumed by react-query
 */
export const createService = <R, T extends {} = {}>({
  url,
  get,
}: {
  /**
   * A pure function that returns the url the service uses from the params given.
   *
   * It should not have any side effects.
   */
  url: (params: T) => Url;
  /** perform an async fetch given the url and params */
  get: (url: Url, params: T) => Promise<R>;
}) => {
  return (params: T) => ({
    queryKey: [url(params), params],
    queryFn: () => get(url(params), params),
  });
};
