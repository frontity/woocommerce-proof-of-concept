import { State } from "frontity/types";
import { Packages } from "../types";

type StoreApiPayload = {
  state: State<Packages>;
  endpoint: string;
  method?: "GET" | "POST" | "PUT";
  params?: Record<string, any>;
  body?: unknown;
};

const storeApi = async <Result = unknown>({
  state,
  endpoint,
  method = "GET",
  params = {},
  body = undefined,
}: StoreApiPayload): Promise<Result> => {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(
    `${state.wpSource.api}wc/store/${endpoint}?${searchParams}`,
    {
      method,
      credentials: "include",
      body: body && JSON.stringify(body),
      headers: body && {
        "Content-Type": "application/json",
      },
    }
  );

  const result: Result = await response.json();

  return result;
};

export default storeApi;
