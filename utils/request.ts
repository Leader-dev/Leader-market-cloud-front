import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface CodeHandlerProps {
  response: AxiosResponse;
  code: number;
  config: AxiosRequestConfig;
}

type CodeHandler = (props: CodeHandlerProps) => void;

declare module "axios" {
  export interface AxiosRequestConfig {
    codeHandlers?: {
      [code: number]: CodeHandler;
    };
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_ENDPOINT,
  codeHandlers: {
    500: (res) => {
      console.log("Server error");
    },
  },
  method: "POST",
});

// TODO: save using native APIs
let ssrApiKey = "";

const isClientSide = () => typeof window !== "undefined";

export const saveKey = (key: string) => {
  if (isClientSide()) {
    localStorage.setItem("apikey", key);
  } else {
    ssrApiKey = key;
  }
};

export const getKey = (): string | null => {
  if (isClientSide()) {
    return localStorage.getItem("apikey") as string;
  } else {
    return ssrApiKey;
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    const {
      data: { code },
      config,
    } = response;
    console.log({ y: response.headers });
    if ("set-api-token" in response.headers) {
      saveKey(response.headers["set-api-token"]);
    }
    if (code && (code < 200 || code >= 300)) {
      if (config.codeHandlers && code in config.codeHandlers) {
        config.codeHandlers[code]({
          response,
          code,
          config,
        });
      } else {
        console.log({ env: process.env.NODE_ENV, response });
        if (process.env.NODE_ENV === "development") {
          throw new Error(response.data?.message || code);
        }
      }
    }
    return response;
  },
  (error) => {
    console.log(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const k = getKey();
  if (k) {
    if (config.headers) {
      config.headers["api-token"] = k;
    } else {
      config.headers = { "api-token": k };
    }
  }
  console.log({ k });
  return config;
});

export const request = axiosInstance;

// @ts-ignore
// if (process.env.NODE_ENV === "development") window.axios = axiosInstance;
