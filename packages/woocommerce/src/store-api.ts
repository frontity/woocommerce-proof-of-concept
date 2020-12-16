import { State } from "frontity/types";
import { Packages } from "../types";

/**
 * Params passed to {@link storeApi}.
 */
type StoreApiPayload = {
  /**
   * The Frontity state.
   */
  state: State<Packages>;

  /**
   * Specific endpoint of the `/wc/store/` API, without the initial slash.
   *
   * @example "cart"
   * @example "cart/add-item"
   */
  endpoint: string;

  /**
   * The HTTP method used to send the request.
   *
   * @defaultValue `"GET"`
   */
  method?: "GET" | "POST" | "PUT";

  /**
   * Map of search params used in this request.
   *
   * @defaultValue `{}`
   */
  params?: Record<string, any>;

  /**
   * Serializable object that will be sent in JSON format.
   *
   * @defaultValue `undefined`
   */
  body?: unknown;
};

/**
 * Send requests to the `/wc/store/` API added by the WooCommerce Blocks plugin.
 *
 * @param payload - Object of type {@link StoreApiPayload}.
 *
 * @returns A promise that resolves with the returned value.
 */
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
