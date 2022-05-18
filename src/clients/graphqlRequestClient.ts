import { GraphQLClient } from "graphql-request";

export const saveKey = (key: string) => {
  localStorage.setItem("apikey", key);
};

export const getKey = (): string | null => {
  return localStorage.getItem("apikey") as string;
};

const requestHeaders = {
  "Content-Type": "application/json",
};

const graphqlRequestClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
