import { AxiosRequestConfig } from "axios";
import { EnclosureHttpRequestConfig } from "./types";


/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {

  baseURL: process.env.NODE_ENV === "production"?'' :'',
  //60秒超时
  timeout: 60000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  }
};

export function excludeProps<T extends { [key: string]: any }>(
  origin: T,
  prop: string
): { [key: string]: T } {
  return Object.keys(origin)
    .filter(key => !prop.includes(key))
    .reduce((res, key) => {
      res[key] = origin[key];
      return res;
    }, {} as { [key: string]: T });
}

export function transformConfigByMethod(
  params: any,
  config: EnclosureHttpRequestConfig
): EnclosureHttpRequestConfig {
  const { method } = config;
  const props = ["delete", "get", "head", "options"].includes(
    method!.toLocaleLowerCase()
  )
    ? "params"
    : "data";
  return {
    ...config,
    [props]: params
  };
}

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig;
  }

  const { headers } = config;
  if (headers && typeof headers === "object") {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers
    };
  }
  return { ...excludeProps(config!, "headers"), ...defaultConfig };
}

export const METHODS = ["post", "get", "put", "delete", "option", "patch"];